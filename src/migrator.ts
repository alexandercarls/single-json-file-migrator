import * as fs from "fs";
import { assert } from "console";
import * as path from "path";

interface Db {
  version: Version;
  history: History[];
}

type Version = string;

interface History {
  from: Version;
  to: Version;
  at: string;
  duration: number; // in milliseconds
}

export function loadFile(fileName: string): Db {
  const file = fs.readFileSync(fileName, "utf8");
  return JSON.parse(file);
}

// Returns null if there is nothing to migrate
export function migrate(db: Db): Db | null {
  const fromVersion = db.version;
  const start = Date.now();

  // TODO: JSON Schema Validation
  assert(Array.isArray(db.history), "History must be an array");

  const migrations = getAllMigrationScripts();
  const pendingMirations = getPendingMigrations(migrations, fromVersion);

  if (pendingMirations.length < 1) {
    console.log("No pending migration.");
    return null;
  }

  let migration: any;
  for (migration of pendingMirations) {
    console.log("Applying migration: ", migration);
    const m = require(migration);
    db = m.default(db);
  }

  // Add Migration information of the last applied migration.
  const end = Date.now();
  addMigrationInfo(db, fromVersion, path.parse(migration).name, end - start);

  return db;
}

function getAllMigrationScripts(): string[] {
  const migrationsFolder = "migrations";
  return fs
    .readdirSync(migrationsFolder)
    .sort((a, b) => a.localeCompare(b))
    .map(f => path.join(__dirname, "..", migrationsFolder, f));
}

function getPendingMigrations(migrations: string[], currentVersion: string) {
  for (let i = 0; i < migrations.length; i++) {
    const migration = migrations[i];

    if (path.parse(migration).name === currentVersion) {
      return migrations.slice(i + 1);
    }
  }

  // We need to apply all migrations if we have no match
  return migrations;
}

function addMigrationInfo(
  db: Db,
  fromVersion: Version,
  toVersion: Version,
  duration: number
) {
  db.version = toVersion;
  db.history.push({
    from: fromVersion,
    to: toVersion,
    at: new Date().toISOString(),
    duration
  });
}

export function archiveFile(filename: string, version: Version) {
  const archiveDir = path.join(__dirname, "..", "archive");

  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir);
  }
  fs.copyFileSync(
    filename,
    path.join(archiveDir, `${version}_${path.basename(filename)}`)
  );
  fs.unlinkSync(filename);
}

export function saveFile(fileName: string, db: Db) {
  fs.writeFileSync(fileName, JSON.stringify(db));
}

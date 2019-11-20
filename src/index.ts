import { loadFile, migrate, archiveFile, saveFile } from "./migrator";
import * as path from "path";

const dbFilename = path.join(__dirname, "..", "db.json");

// Load the current database/store file.
const db = loadFile(dbFilename);
const currentVersion = db.version;

// Migrate the file contents and return the migrated data.
const migratedDb = migrate(db);

if (migratedDb) {
  // Archive the current db file with the applied version as a prefix.
  archiveFile(dbFilename, currentVersion);

  // Save migrated file as the new db.
  saveFile(dbFilename, migratedDb);
}

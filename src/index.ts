import { loadFile, migrate, archiveFile, saveFile } from "./migrator";

const dbFilename = "./db.json";

// Load the current database/store file.
const db = loadFile(dbFilename);

// Migrate the file contents and return the migrated data.
const migratedDb = migrate(db);

if (migratedDb) {
  // Archive the current db file with the applied version as a prefix.
  archiveFile(dbFilename, migratedDb.version);

  // Save migrated file as the new db.
  saveFile(dbFilename, migratedDb);
}

# Single File JSON Migrator

## Scripts

### `yarn start`

Migrates the file `db.json` by applying the pending migrations in the folder `migrations` in order.
The original file will be archived.

- No down migrations, only up
- TODO: Test coverage
- TODO: JSON Schema validation
- TODO: Maybe save the current version and history outside of the db.json file

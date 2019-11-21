# Single File JSON Migrator

- No down migrations, only up
- TODO: Test coverage
  - Individual functions
  - Scripts must be tested outside of the library
- TODO: JSON Schema validation
- TODO: Maybe save the current version and history outside of the db.json file
- TODO: Maybe track the applied migrations specifically, this would allow the scrips to be applied out of order.
  The use case would be merging to branches where each one contains a non-conflicting migration. And the latter one from the sort order perspective was already applied, resulting in the earlier one to be skipped.
- TODO: Consider adding the initial state as the default script.

## Scripts

### `yarn start`

Migrates the file `db.json` by applying the pending migrations in the folder `migrations` in order.
The original file will be archived.

### `yarn run create-migration`

Creates an empty migration script.

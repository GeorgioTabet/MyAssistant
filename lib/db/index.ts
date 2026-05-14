/**
 * SQLite database setup. The whole app's data lives in a single on-device
 * file — no backend, no cloud (see CLAUDE.md).
 *
 * The database is opened lazily on first use (not at module load) so that
 * bundling and web static-rendering never try to open it.
 */

import * as SQLite from 'expo-sqlite';

const DB_NAME = 'myassistant.db';

let database: SQLite.SQLiteDatabase | null = null;

/** Returns the open database, opening it and creating tables on first call. */
export function getDb(): SQLite.SQLiteDatabase {
  if (!database) {
    database = SQLite.openDatabaseSync(DB_NAME);
    database.execSync(`
      CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY NOT NULL,
        text TEXT NOT NULL,
        layer TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `);
  }
  return database;
}

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

/**
 * Brings the schema up to date. Uses SQLite's `user_version` so each step
 * runs exactly once — safe on both fresh installs and existing databases.
 */
function migrate(db: SQLite.SQLiteDatabase): void {
  const row = db.getFirstSync<{ user_version: number }>('PRAGMA user_version');
  const version = row?.user_version ?? 0;

  if (version < 1) {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY NOT NULL,
        text TEXT NOT NULL,
        layer TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `);
    db.execSync('PRAGMA user_version = 1');
  }

  if (version < 2) {
    // Optional reminder time for an item (ISO timestamp, NULL = no reminder).
    db.execSync('ALTER TABLE items ADD COLUMN dueAt TEXT');
    db.execSync('PRAGMA user_version = 2');
  }
}

/** Returns the open database, running migrations on first call. */
export function getDb(): SQLite.SQLiteDatabase {
  if (!database) {
    database = SQLite.openDatabaseSync(DB_NAME);
    migrate(database);
  }
  return database;
}

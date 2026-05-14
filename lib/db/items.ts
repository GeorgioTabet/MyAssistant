/**
 * Data access for captured items. All SQL lives here — screens call these
 * functions, they never touch the database directly.
 */

import type { LayerId } from '@/constants/layers';
import { getDb } from '@/lib/db';

export type Item = {
  id: string;
  text: string;
  layer: LayerId;
  /** ISO timestamp of when the item was captured. */
  createdAt: string;
};

/** All items, newest first. */
export function getAllItems(): Item[] {
  return getDb().getAllSync<Item>('SELECT * FROM items ORDER BY createdAt DESC');
}

/** Items belonging to one layer, newest first. */
export function getItemsByLayer(layer: LayerId): Item[] {
  return getDb().getAllSync<Item>(
    'SELECT * FROM items WHERE layer = ? ORDER BY createdAt DESC',
    layer
  );
}

/** Number of items in one layer. */
export function countItemsByLayer(layer: LayerId): number {
  const row = getDb().getFirstSync<{ count: number }>(
    'SELECT COUNT(*) AS count FROM items WHERE layer = ?',
    layer
  );
  return row?.count ?? 0;
}

/** Insert a new item and return it. */
export function addItem(text: string, layer: LayerId): Item {
  const item: Item = {
    id: `${Date.now()}`,
    text,
    layer,
    createdAt: new Date().toISOString(),
  };
  getDb().runSync(
    'INSERT INTO items (id, text, layer, createdAt) VALUES (?, ?, ?, ?)',
    item.id,
    item.text,
    item.layer,
    item.createdAt
  );
  return item;
}

/** Move an item to a different layer (used to correct AI misclassifications). */
export function updateItemLayer(id: string, layer: LayerId): void {
  getDb().runSync('UPDATE items SET layer = ? WHERE id = ?', layer, id);
}

/** Delete an item by id. */
export function deleteItem(id: string): void {
  getDb().runSync('DELETE FROM items WHERE id = ?', id);
}

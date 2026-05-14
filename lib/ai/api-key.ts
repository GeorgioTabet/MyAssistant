/**
 * Anthropic API key storage. The key lives in expo-secure-store — the phone's
 * OS-level encrypted storage — never in the database or in code (see CLAUDE.md).
 */

import * as SecureStore from 'expo-secure-store';

const STORAGE_KEY = 'anthropic_api_key';

/** The saved API key, or null if the user hasn't entered one. */
export async function getApiKey(): Promise<string | null> {
  return SecureStore.getItemAsync(STORAGE_KEY);
}

/** Save the API key to encrypted storage. */
export async function setApiKey(value: string): Promise<void> {
  await SecureStore.setItemAsync(STORAGE_KEY, value);
}

/** Remove the saved API key. */
export async function clearApiKey(): Promise<void> {
  await SecureStore.deleteItemAsync(STORAGE_KEY);
}

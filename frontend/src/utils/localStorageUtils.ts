// Utility functions for managing local storage in a type-safe manner

/**
 * Retrieves an item from local storage.
 * @returns The item object if found and valid, null otherwise.
 */
export function retrieveFromLocalStorage<T>(key: string): T | null {
  const itemJson = localStorage.getItem(key);
  if (!itemJson) return null;

  try {
    return JSON.parse(itemJson) as T;
  } catch (error) {
    console.error("Failed to parse item from local storage", error);
    return null;
  }
}

/**
 * Saves an item to local storage.
 * @param key - The key under which to store the item.
 * @param item - The item to store.
 */
export function saveToLocalStorage<T>(key: string, item: T): void {
  try {
    const itemJson = JSON.stringify(item);
    localStorage.setItem(key, itemJson);
  } catch (error) {
    console.error("Failed to save item to local storage", error);
  }
}

/**
 * Removes an item from local storage.
 * @param key - The key of the item to remove.
 */
export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove item from local storage", error);
  }
}

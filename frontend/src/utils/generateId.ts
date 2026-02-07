/**
 * Generates a unique ID based on the current timestamp and a random string.
 * Format: <timestamp>-<random>
 * Example: 1678888888888-abc1234
 * 
 * @returns A unique string ID.
 */
export const generateId = (): string => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 9);
    return `${timestamp}-${random}`;
};

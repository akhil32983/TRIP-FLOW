
/**
 * Helper function to generate a unique username with 30 characters or less.
 * @param prefix The prefix for the username.
 * @returns A unique username string.
 */
export function generateUsername(prefix: string): string {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substring(2, 6);
    return `${prefix}_${timestamp}_${random}`;
}

import type { UserStatsResponse } from "@/types/stats";
import { http } from "@services/httpService";

const BASE_PATH = "/api/v1/stats";

/**
 * Fetches statistics related to the user.
 *
 * @returns A promise that resolves to the user's statistics.
 */
export async function getUserStats(): Promise<UserStatsResponse> {
    return http<UserStatsResponse>(`${BASE_PATH}/user`, "GET");
}
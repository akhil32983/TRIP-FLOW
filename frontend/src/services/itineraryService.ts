import type { Itinerary } from "@/types/itinerary";
import type { PageRequest, PageResponse } from "@/types/shared";
import { http } from "@services/httpService";

const BASE_PATH = "/api/v1/itineraries";

/**
 * Retrieves a paginated list of itineraries for the current user.
 * 
 * @param requestParams Pagination parameters including page number and size.
 * @returns A promise that resolves to a paginated response of itineraries.
 */
export async function getUserItineraries(requestParams: PageRequest = { page: 0, size: 10 }): Promise<PageResponse<Itinerary>> {
    return http(`${BASE_PATH}?page=${requestParams.page}&size=${requestParams.size}`, "GET");
}
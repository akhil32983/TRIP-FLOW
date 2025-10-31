import type { ExtendedItinerary, Itinerary } from "@/types/itinerary";
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

/**
 * Retrieves the details of a specific itinerary by its ID.
 * 
 * @param itineraryId The unique identifier of the itinerary.
 * @returns A promise that resolves to the itinerary details.
 */
export async function getItineraryById(itineraryId: number): Promise<ExtendedItinerary> {
    return http(`${BASE_PATH}/${itineraryId}`, "GET");
}

/**
 * Creates a new itinerary with the provided details.
 *
 * @param itinerary The itinerary data to be created.
 * @returns A promise that resolves to the created itinerary.
 */
export async function createItinerary(itinerary: ExtendedItinerary): Promise<ExtendedItinerary> {
    return http(`${BASE_PATH}`, "POST", itinerary);
}

/**
 * Updates an existing itinerary with the provided details.
 *
 * @param itineraryId The unique identifier of the itinerary to be updated.
 * @param itinerary The updated itinerary data.
 * @returns A promise that resolves to the updated itinerary.
 */
export async function updateItinerary(itineraryId: number, itinerary: ExtendedItinerary): Promise<ExtendedItinerary> {
    return http(`${BASE_PATH}/${itineraryId}`, "PUT", itinerary);
}

/**
 * Deletes an itinerary by its ID.
 *
 * @param itineraryId The unique identifier of the itinerary to be deleted.
 * @returns A promise that resolves when the itinerary is deleted.
 */
export async function deleteItinerary(itineraryId: number): Promise<void> {
    return http(`${BASE_PATH}/${itineraryId}`, "DELETE");
}
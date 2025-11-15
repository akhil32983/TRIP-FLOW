import type { ExtendedItinerary, Itinerary } from "@/types/itinerary";
import type { PageResponse } from "@/types/shared";

let itineraries: ExtendedItinerary[] = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 1,
  icon: "🌍",
  title: `Trip ${i + 1}`,
  place: ["Tokyo", "Paris", "New York", "Rome", "Lisbon"][i],
  people: Math.floor(Math.random() * 4) + 1,
  budget: Math.floor(Math.random() * 2000) + 500,
  date: new Date(2025, 5, i + 1).toISOString(),
  status: "PLANNED",
  countDays: 3,
  tags: ["sightseeing", "food", "culture"],
  days: [
    {
      day: 1,
      activities: [
        {
          activity: "City Tour",
          details: "Explore main attractions",
          location: {
            name: "City Center",
            address: "123 Main St",
            coordinates: { latitude: 35.6895, longitude: 139.6917 },
          },
          time: "09:00",
          duration: "3h",
        },
      ],
    },
  ],
}));

export const mockItineraries = {
  "/api/v1/itineraries": async (
    method: string,
    body?: unknown
  ): Promise<PageResponse<Itinerary> | ExtendedItinerary> => {
    switch (method) {
      case "GET": {
        const response: PageResponse<Itinerary> = {
          page: itineraries.map(({ days, ...basic }) => basic),
          currentPage: 0,
          totalPages: 1,
          totalItems: itineraries.length,
          itemsPerPage: itineraries.length,
          isLastPage: true,
        };
        
        return response;
      }

      case "POST": {
        const newItinerary = {
          ...(body as ExtendedItinerary),
          id: itineraries.length + 1,
        };
        
        itineraries.push(newItinerary);
        return newItinerary;
      }

      default:
        throw new Error(`Method ${method} not allowed on /api/v1/itineraries`);
    }
  },

  "/api/v1/itineraries/:id": async (
    method: string,
    body?: unknown,
    url?: string
  ): Promise<ExtendedItinerary | void> => {
    const id = Number(url?.split("/").pop());
    const index = itineraries.findIndex((it) => it.id === id);
    if (index === -1) throw new Error(`Itinerary ${id} not found`);

    switch (method) {
      case "GET":
        return itineraries[index];

      case "PUT":
        itineraries[index] = { ...(body as ExtendedItinerary), id };
        return itineraries[index];

      case "DELETE":
        itineraries = itineraries.filter((it) => it.id !== id);
        return;

      default:
        throw new Error(`Method ${method} not allowed on /api/v1/itineraries/:id`);
    }
  },
};

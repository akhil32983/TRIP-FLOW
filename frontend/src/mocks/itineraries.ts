import type { ExtendedItinerary, Itinerary } from "@/types/itinerary";
import type { PageResponse } from "@/types/shared";

const defaultCoverImage: ExtendedItinerary["coverImage"] = {
  imageUrl: "https://images.unsplash.com/photo-1611416457332-946853cc75d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MzA1NjJ8MHwxfHNlYXJjaHwxfHxuaWdodCUyMGNpdHl8ZW58MHx8fHwxNzY1MTA3ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  altDescription: "city skyline during night time",
  authorUsername: "chentianlu",
}

let itineraries: ExtendedItinerary[] = [
  {
    id: 1,
    title: "Spring in Tokyo",
    place: "Tokyo, Japan",
    people: 2,
    budget: 3500,
    date: "2025-04-10",
    status: "COMPLETED",
    countDays: 3,
    tags: ["cherry blossoms", "food", "temples"],
    coverImage: {
      altDescription: "Tokyo Tower from the Mori building",
      imageUrl: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MzA1NjJ8MHwxfHNlYXJjaHwxfHxUb2t5b3xlbnwwfHx8fDE3NjUwNDMxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      authorUsername: "thetalkinglens",
    },
    days: [
      {
        day: 1,
        activities: [
          {
            activity: "Arrival and Check-in",
            details: "Check in at your Shinjuku hotel and rest from the trip. Take time to unpack and settle in.",
            location: {
              name: "Shinjuku Granbell Hotel",
              address: "2-14-5 Kabukicho, Shinjuku City, Tokyo",
              coordinates: { latitude: 35.6956, longitude: 139.703 },
            },
            time: "15:00",
            duration: "1h",
          },
          {
            activity: "Shibuya Crossing",
            details: "Cross the world-famous Shibuya Crossing. Visit Hachiko statue and explore nearby fashion shops.",
            location: {
              name: "Shibuya Scramble Crossing",
              address: "Shibuya City, Tokyo",
              coordinates: { latitude: 35.6595, longitude: 139.7005 },
            },
            time: "17:00",
            duration: "2h",
          },
        ],
      },
      {
        day: 2,
        activities: [
          {
            activity: "Senso-ji Temple",
            details: "Visit Senso-ji, Tokyo's oldest temple. Walk through the Thunder Gate and explore traditional shops on Nakamise street.",
            location: {
              name: "Senso-ji",
              address: "2 Chome-3-1 Asakusa, Taito City, Tokyo",
              coordinates: { latitude: 35.7148, longitude: 139.7967 },
            },
            time: "10:00",
            duration: "3h",
          },
        ],
      },
      {
        day: 3,
        activities: [
          {
            activity: "Meiji Shrine",
            details: "Stroll through the peaceful forest to Meiji Jingu Shrine. Admire the traditional architecture and serene atmosphere.",
            location: {
              name: "Meiji Jingu",
              address: "1-1 Yoyogikamizonocho, Shibuya City, Tokyo",
              coordinates: { latitude: 35.6764, longitude: 139.6993 },
            },
            time: "09:00",
            duration: "2h",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Art and Culture in Paris",
    place: "Paris, France",
    people: 2,
    budget: 2500,
    date: "2025-06-15",
    status: "ONGOING",
    countDays: 2,
    tags: ["museums", "romantic", "gastronomy"],
    coverImage: {
      altDescription: "Eiffel tower during daytime",
      imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MzA1NjJ8MHwxfHNlYXJjaHwxfHxQYXJpc3xlbnwwfHx8fDE3NjUwNDMxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      authorUsername: "anthonydelanoix",
    },
    days: [
      {
        day: 1,
        activities: [
          {
            activity: "Eiffel Tower",
            details: "Climb the Eiffel Tower for panoramic views of Paris. Explore the different levels and admire the city from above.",
            location: {
              name: "Eiffel Tower",
              address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris",
              coordinates: { latitude: 48.8584, longitude: 2.2945 },
            },
            time: "10:00",
            duration: "3h",
          },
          {
            activity: "Seine River Cruise",
            details: "Enjoy a relaxing cruise on the Seine. See illuminated monuments like Notre-Dame and the Louvre at sunset.",
            location: {
              name: "Bateaux Parisiens",
              address: "Port de la Bourdonnais, 75007 Paris",
              coordinates: { latitude: 48.8595, longitude: 2.293 },
            },
            time: "19:00",
            duration: "2h",
          },
        ],
      },
      {
        day: 2,
        activities: [
          {
            activity: "Louvre Museum",
            details: "Explore the vast art collection of the Louvre. See masterpieces like the Mona Lisa and Venus de Milo.",
            location: {
              name: "Louvre Museum",
              address: "Rue de Rivoli, 75001 Paris",
              coordinates: { latitude: 48.8606, longitude: 2.3376 },
            },
            time: "09:00",
            duration: "4h",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "NYC Skyscrapers",
    place: "New York, USA",
    people: 4,
    budget: 4000,
    date: "2025-09-01",
    status: "PLANNED",
    countDays: 2,
    tags: ["urban", "shopping", "broadway"],
    coverImage: {
      altDescription: "Empire State Building, New York at night",
      imageUrl: "https://images.unsplash.com/photo-1541336032412-2048a678540d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MzA1NjJ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTc2NTA0MzAzMnww&ixlib=rb-4.1.0&q=80&w=1080",
      authorUsername: "timovaknar",
    },
    days: [
      {
        day: 1,
        activities: [
          {
            activity: "Central Park",
            details: "Walk the scenic trails of Central Park. Enjoy a coffee near Bethesda Terrace and breathe fresh air.",
            location: {
              name: "Central Park",
              address: "New York, NY",
              coordinates: { latitude: 40.7851, longitude: -73.9683 },
            },
            time: "08:00",
            duration: "2h",
          },
          {
            activity: "The Met",
            details: "Visit the Met to see 5,000 years of art. Don't miss the Temple of Dendur and European paintings.",
            location: {
              name: "The Met",
              address: "1000 5th Ave, New York, NY 10028",
              coordinates: { latitude: 40.7794, longitude: -73.9632 },
            },
            time: "11:00",
            duration: "3h",
          },
        ],
      },
      {
        day: 2,
        activities: [
          {
            activity: "Times Square",
            details: "Experience the bright lights and energy of Times Square. See iconic billboards and lively crowds.",
            location: {
              name: "Times Square",
              address: "Manhattan, NY 10036",
              coordinates: { latitude: 40.758, longitude: -73.9855 },
            },
            time: "18:00",
            duration: "1h",
          },
          {
            activity: "Broadway Show",
            details: "Watch a world-class musical or play on Broadway. Enjoy live storytelling in a historic theater.",
            location: {
              name: "Broadway Theatre",
              address: "1681 Broadway, New York, NY 10019",
              coordinates: { latitude: 40.7634, longitude: -73.9829 },
            },
            time: "19:30",
            duration: "3h",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Historic Rome Tour",
    place: "Rome, Italy",
    people: 2,
    budget: 2800,
    date: "2025-05-20",
    status: "PLANNED",
    countDays: 2,
    tags: ["history", "food", "architecture"],
    coverImage: {
      altDescription: "Colosseum arena photography",
      imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MzA1NjJ8MHwxfHNlYXJjaHwxfHxSb21hfGVufDB8fHx8MTc2NTA0MzI5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      authorUsername: "davidkhlr",
    },
    days: [
      {
        day: 1,
        activities: [
          {
            activity: "Colosseum",
            details: "Tour the Colosseum, the largest ancient amphitheater. Walk the arena and learn about gladiator history.",
            location: {
              name: "Colosseum",
              address: "Piazza del Colosseo, 1, 00184 Roma RM",
              coordinates: { latitude: 41.8902, longitude: 12.4922 },
            },
            time: "09:00",
            duration: "3h",
          },
        ],
      },
      {
        day: 2,
        activities: [
          {
            activity: "Vatican Museums",
            details: "Admire the vast collection of the Vatican Museums. See the Sistine Chapel ceiling and St. Peter's Basilica.",
            location: {
              name: "Vatican Museums",
              address: "00120 Vatican City",
              coordinates: { latitude: 41.9067, longitude: 12.4547 },
            },
            time: "08:30",
            duration: "4h",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Coastal Vibes of Lisbon",
    place: "Lisbon, Portugal",
    people: 3,
    budget: 1800,
    date: "2025-07-05",
    status: "PLANNED",
    countDays: 2,
    tags: ["beach", "wine", "fado"],
    coverImage: {
      altDescription: "yellow and white tram on road during daytime",
      imageUrl: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MzA1NjJ8MHwxfHNlYXJjaHwxfHxMaXNib258ZW58MHx8fHwxNzY1MDQzMzU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      authorUsername: "aayush_gupta",
    },
    days: [
      {
        day: 1,
        activities: [
          {
            activity: "Belém Tower",
            details: "Visit Belém Tower on the Tagus River. Admire the Manueline architecture of this historic fortress.",
            location: {
              name: "Belém Tower",
              address: "Av. Brasília, 1400-038 Lisbon",
              coordinates: { latitude: 38.6916, longitude: -9.216 },
            },
            time: "10:00",
            duration: "1h",
          },
          {
            activity: "Pastéis de Nata",
            details: "Try the famous Pastéis de Nata at the Old Confeitaria de Belém. Enjoy these warm pies with cinnamon.",
            location: {
              name: "Pastéis de Belém",
              address: "R. de Belém 84 92, 1300-085 Lisbon",
              coordinates: { latitude: 38.6975, longitude: -9.2032 },
            },
            time: "11:30",
            duration: "1h",
          },
        ],
      },
      {
        day: 2,
        activities: [
          {
            activity: "Alfama Neighborhood",
            details: "Wander through the narrow streets of Alfama. See the colorful houses and enjoy views from São Jorge Castle.",
            location: {
              name: "Alfama",
              address: "Alfama, Lisbon",
              coordinates: { latitude: 38.7115, longitude: -9.1305 },
            },
            time: "15:00",
            duration: "3h",
          },
        ],
      },
    ],
  },
];

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
        const bodyData = body as ExtendedItinerary;

        const newItinerary: ExtendedItinerary = {
          ...bodyData,
          coverImage: defaultCoverImage,
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
        return itineraries[index] || itineraries[1];

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

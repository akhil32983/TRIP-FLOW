export type ItineraryStatus = "DRAFT" | "PLANNED" | "ONGOING" | "COMPLETED";

export interface Activity {
    activity: string;
    details: string;
    location: {
        name: string;
        address: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
    };
    time: string;
    duration: string;
}

export interface ItineraryDay {
    day: number;
    activities: Activity[];
}

export interface Itinerary {
    id: number;
    icon: string;
    title: string;
    place: string;
    people: number;
    budget: number;
    date: string;
    status: ItineraryStatus;
    countDays: number;
    tags: string[];
}

export interface ExtendedItinerary extends Itinerary {
    days: ItineraryDay[];
}

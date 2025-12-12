import ActivityCard from "@components/dashboard/itineraries/ActivityCard";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

import type { Activity } from "@/types/itinerary";

describe("ActivityCard Component", () => {
    const mockActivity: Activity = {
        activity: "Visit Museum",
        time: "10:00 AM",
        location: {
            name: "Louvre Museum",
            address: "Rue de Rivoli",
            coordinates: {
                latitude: 48.8606,
                longitude: 2.3376
            }
        },
        details: "See the Mona Lisa",
        duration: "2 hours",
    };

    it("renders activity details correctly", () => {
        render(<ActivityCard activity={mockActivity} />);
        expect(screen.getByText("Visit Museum")).toBeInTheDocument();
        expect(screen.getByText("10:00 AM")).toBeInTheDocument();
        expect(
            screen.getByText("Louvre Museum - Rue de Rivoli")
        ).toBeInTheDocument();
        expect(screen.getByText("See the Mona Lisa")).toBeInTheDocument();
        expect(screen.getByText("Duración: 2 hours")).toBeInTheDocument();
    });
});

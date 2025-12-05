import ExtendedItinerary from "@components/dashboard/ExtendedItinerary";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";
import type { ExtendedItinerary as ExtendedItineraryType } from "@/types/itinerary";

// Secondary dependencies mocks
vi.mock("@components/shared/Badge", () => ({
    default: ({ status, style, title }: any) => (
        <span data-testid="badge" data-status={status} data-style={style}>
            {status || title}
        </span>
    ),
}));

vi.mock("@components/dashboard/InfoCard", () => ({
    default: ({ title, value }: any) => (
        <div data-testid="info-card">
            <span>{title}</span>
            <span>{value}</span>
        </div>
    ),
}));

const mockItinerary: ExtendedItineraryType = {
    id: 1,
    title: "Aventura en Tokio",
    place: "Tokio, Japón",
    status: "PLANNED",
    people: 3,
    budget: 1500,
    countDays: 2,
    date: "2025-07-15",
    tags: ["Cultura", "Gastronomía", "Tecnología"],
    days: [
        {
            day: 1,
            activities: [
                {
                    time: "09:00",
                    duration: "2h",
                    activity: "Visita al Templo Senso-ji",
                    details: "Explora el templo más antiguo de Tokio",
                    location: {
                        name: "Templo Senso-ji",
                        address: "2 Chome-3-1 Asakusa, Taito City, Tokyo",
                        coordinates: {
                            latitude: 35.7148,
                            longitude: 139.7967
                        }
                    },
                },
                {
                    time: "14:00",
                    duration: "3h",
                    activity: "Tour por Shibuya",
                    details: "Conoce el famoso cruce de Shibuya",
                    location: {
                        name: "Shibuya Crossing",
                        address: "Shibuya City, Tokyo",
                        coordinates: {
                            latitude: 35.6595,
                            longitude: 139.7005
                        },
                    },
                },
            ],
        },
        {
            day: 2,
            activities: [
                {
                    time: "10:00",
                    duration: "4h",
                    activity: "Visita al Monte Fuji",
                    details: "Excursión de día completo",
                    location: {
                        name: "Monte Fuji",
                        address: "Fujinomiya, Shizuoka",
                        coordinates: {
                            latitude: 35.3606,
                            longitude: 138.7274
                        }
                    },
                },
            ],
        },
    ],
    coverImage: {
        altDescription: "Vista del Monte Fuji",
        imageUrl: "https://example.com/monte-fuji.jpg",
        authorUsername: "fotografo123",
    }
};

describe("ExtendedItinerary Component", () => {
    it("renders extended itinerary component", () => {
        const { container } = render(
            <ExtendedItinerary itinerary={mockItinerary} />
        );

        expect(container.firstChild).toBeInTheDocument();
    });

    it("renders as section element", () => {
        const { container } = render(
            <ExtendedItinerary itinerary={mockItinerary} />
        );

        const section = container.querySelector("section");
        expect(section).toBeInTheDocument();
    });

    it("renders all info cards", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        const infoCards = screen.getAllByTestId("info-card");
        expect(infoCards).toHaveLength(5);
    });

    it("renders destination info", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        expect(screen.getByText("Destino")).toBeInTheDocument();
        expect(screen.getByText("Tokio, Japón")).toBeInTheDocument();
    });

    it("renders people count", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        expect(screen.getByText("Personas")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("renders budget with currency", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        expect(screen.getByText("Presupuesto")).toBeInTheDocument();
        expect(screen.getByText("1.500, 00 €")).toBeInTheDocument();
    });

    it("renders formatted date", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        expect(screen.getByText("Fecha")).toBeInTheDocument();
        expect(screen.getByText(/julio/i)).toBeInTheDocument();
    });

    it("renders duration in days", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        expect(screen.getByText("Duración")).toBeInTheDocument();
        expect(screen.getByText("2 días")).toBeInTheDocument();
    });

    it("renders all tags", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        expect(screen.getByText("#Cultura")).toBeInTheDocument();
        expect(screen.getByText("#Gastronomía")).toBeInTheDocument();
        expect(screen.getByText("#Tecnología")).toBeInTheDocument();
    });

    it("renders all day cards", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        expect(screen.getByText("Día 1")).toBeInTheDocument();
        expect(screen.getByText("Día 2")).toBeInTheDocument();
    });

    it("renders activity count for each day", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        expect(screen.getByText("2 actividades")).toBeInTheDocument();
        expect(screen.getByText("1 actividades")).toBeInTheDocument();
    });

    it("renders activity time", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        expect(screen.getByText("09:00")).toBeInTheDocument();
        expect(screen.getByText("14:00")).toBeInTheDocument();
    });

    it("renders activity duration", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        expect(screen.getByText("2h")).toBeInTheDocument();
        expect(screen.getByText("3h")).toBeInTheDocument();
    });

    it("renders activity titles", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        expect(
            screen.getByText("Visita al Templo Senso-ji")
        ).toBeInTheDocument();
        expect(screen.getByText("Tour por Shibuya")).toBeInTheDocument();
    });

    it("renders activity details", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        expect(
            screen.getByText("Explora el templo más antiguo de Tokio")
        ).toBeInTheDocument();
    });

    it("renders activity location name", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        expect(screen.getByText("Templo Senso-ji")).toBeInTheDocument();
    });

    it("renders activity location address", () => {
        render(<ExtendedItinerary itinerary={mockItinerary} />);

        expect(
            screen.getByText("2 Chome-3-1 Asakusa, Taito City, Tokyo - (35.7148, 139.7967)")
        ).toBeInTheDocument();
    });

    it("handles itinerary with no tags", () => {
        const itineraryNoTags = { ...mockItinerary, tags: [] };
        const { container } = render(
            <ExtendedItinerary itinerary={itineraryNoTags} />
        );

        const tagsSection = container.querySelector('[class*="tags"]');
        expect(tagsSection).toBeInTheDocument();
    });

    it("handles itinerary with no activities", () => {
        const itineraryNoActivities = {
            ...mockItinerary,
            days: [{ day: 1, activities: [] }],
        };

        render(<ExtendedItinerary itinerary={itineraryNoActivities} />);

        expect(screen.getByText("Día 1")).toBeInTheDocument();
        expect(screen.getByText("0 actividades")).toBeInTheDocument();
    });
});

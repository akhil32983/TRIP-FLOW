import ItinerariesPreview from "@components/dashboard/ItinerariesPreview";

import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";

import type { ItineraryStatus } from "@/types/itinerary";

// Secondary dependency mocks
vi.mock("@components/shared/Badge", () => ({
    default: ({
        children,
        title,
    }: {
        children?: React.ReactNode;
        title?: string;
    }) => <span data-testid="badge">{children || title}</span>,
}));

vi.mock("@components/shared/Button", () => ({
    default: ({
        label,
        onClick,
        disabled,
        to,
    }: {
        label: string;
        onClick?: () => void;
        disabled?: boolean;
        to?: string;
    }) => (
        <button onClick={onClick} disabled={disabled} data-to={to}>
            {label}
        </button>
    ),
}));

vi.mock("@components/shared/Loader", () => ({
    default: () => <div data-testid="loader">Loading...</div>,
}));

const mockItineraries = [
    {
        id: 1,
        icon: "🗾",
        title: "Japan Trip",
        place: "Tokyo",
        people: 2,
        budget: 3000,
        date: "2024-06-15",
        status: "ONGOING" as ItineraryStatus,
        countDays: 7,
        tags: ["culture", "gastronomy"],
    },
    {
        id: 2,
        icon: "🏔️",
        title: "Adventure in Peru",
        place: "Cusco",
        people: 4,
        budget: 2000,
        date: "2024-08-20",
        status: "PLANNED" as ItineraryStatus,
        countDays: 10,
        tags: ["adventure", "nature"],
    },
];

describe("ItinerariesPreview Component", () => {
    let mockLoadMore: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockLoadMore = vi.fn();
        vi.clearAllMocks();
    });

    it("renders loading state initially", () => {
        render(
            <ItinerariesPreview
                itineraries={[]}
                loadMore={mockLoadMore}
                isLoading={true}
                isLoadingMore={false}
                isLastPage={false}
            />
        );

        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });

    it("renders itineraries after loading", () => {
        render(
            <ItinerariesPreview
                itineraries={mockItineraries}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={true}
            />
        );

        expect(screen.getByText("Japan Trip")).toBeInTheDocument();
        expect(screen.getByText("Adventure in Peru")).toBeInTheDocument();
    });

    it("renders as section element", () => {
        const { container } = render(
            <ItinerariesPreview
                itineraries={mockItineraries}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={true}
            />
        );

        const section = container.querySelector("section");
        expect(section).toBeInTheDocument();
    });

    it("renders itinerary links with correct href", () => {
        render(
            <ItinerariesPreview
                itineraries={mockItineraries}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={true}
            />
        );

        const links = screen.getAllByRole("link");
        expect(links.length).toBe(2);
        expect(links[0]).toHaveAttribute("href", "/itineraries/1");
        expect(links[1]).toHaveAttribute("href", "/itineraries/2");
    });

    it("renders badges for status and tags", () => {
        render(
            <ItinerariesPreview
                itineraries={mockItineraries}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={true}
            />
        );

        const badges = screen.getAllByTestId("badge");
        expect(badges.length).toBeGreaterThan(0);
    });

    it("renders itinerary details correctly", () => {
        render(
            <ItinerariesPreview
                itineraries={mockItineraries}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={true}
            />
        );

        expect(screen.getByText("Tokyo")).toBeInTheDocument();
        expect(screen.getByText("15 de junio de 2024")).toBeInTheDocument();
        expect(screen.getByText(/7\s+días/)).toBeInTheDocument();
        expect(screen.getByText(/2\s+personas/)).toBeInTheDocument();
        expect(screen.getByText(/3.000, 00\s+€/)).toBeInTheDocument();
    });

    it("renders load more button when not last page", () => {
        render(
            <ItinerariesPreview
                itineraries={mockItineraries}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={false}
            />
        );

        expect(screen.getByText("Cargar más")).toBeInTheDocument();
    });

    it("does not render load more button on last page", () => {
        render(
            <ItinerariesPreview
                itineraries={mockItineraries}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={true}
            />
        );

        expect(screen.queryByText("Cargar más")).not.toBeInTheDocument();
    });

    it("calls loadMore when button is clicked", () => {
        render(
            <ItinerariesPreview
                itineraries={mockItineraries}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={false}
            />
        );

        const button = screen.getByText("Cargar más");
        fireEvent.click(button);

        expect(mockLoadMore).toHaveBeenCalledTimes(1);
    });

    it("shows loading text when loading more", () => {
        render(
            <ItinerariesPreview
                itineraries={mockItineraries}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={true}
                isLastPage={false}
            />
        );

        expect(screen.getByText("Cargando...")).toBeInTheDocument();
    });

    it("disables load more button when loading", () => {
        render(
            <ItinerariesPreview
                itineraries={mockItineraries}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={true}
                isLastPage={false}
            />
        );

        const button = screen.getByText("Cargando...");
        expect(button).toBeDisabled();
    });

    it("renders empty state when no itineraries", () => {
        render(
            <ItinerariesPreview
                itineraries={[]}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={true}
            />
        );

        expect(
            screen.getByText("No tienes itinerarios todavía.")
        ).toBeInTheDocument();
        expect(screen.getByText("Crear itinerario")).toBeInTheDocument();
    });

    it("handles singular person count correctly", () => {
        const singlePersonItinerary = [
            {
                ...mockItineraries[1],
                people: 1,
            },
        ];

        render(
            <ItinerariesPreview
                itineraries={singlePersonItinerary}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={true}
            />
        );

        expect(screen.getByText(/1\s+persona/)).toBeInTheDocument();
    });

    it("handles singular day count correctly", () => {
        const singleDayItinerary = [
            {
                ...mockItineraries[0],
                countDays: 1,
            },
        ];

        render(
            <ItinerariesPreview
                itineraries={singleDayItinerary}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={true}
            />
        );

        expect(screen.getByText(/1\s+día/)).toBeInTheDocument();
    });

    it("renders itinerary icons correctly", () => {
        render(
            <ItinerariesPreview
                itineraries={mockItineraries}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={true}
            />
        );

        expect(screen.getByText("🗾")).toBeInTheDocument();
        expect(screen.getByText("🏔️")).toBeInTheDocument();
    });

    it("renders all stat labels", () => {
        render(
            <ItinerariesPreview
                itineraries={mockItineraries}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={true}
            />
        );

        expect(screen.getAllByText("Fecha").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Duración").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Integrantes").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Presupuesto").length).toBeGreaterThan(0);
    });

    it("renders correct number of tags", () => {
        render(
            <ItinerariesPreview
                itineraries={mockItineraries}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={true}
            />
        );

        expect(screen.getByText("culture")).toBeInTheDocument();
        expect(screen.getByText("gastronomy")).toBeInTheDocument();
        expect(screen.getByText("adventure")).toBeInTheDocument();
        expect(screen.getByText("nature")).toBeInTheDocument();
    });

    it("applies correct CSS animation index", () => {
        const { container } = render(
            <ItinerariesPreview
                itineraries={mockItineraries}
                loadMore={mockLoadMore}
                isLoading={false}
                isLoadingMore={false}
                isLastPage={true}
            />
        );

        const links = container.querySelectorAll("a");
        expect(links[0]).toHaveStyle({ "--index": "1" });
        expect(links[1]).toHaveStyle({ "--index": "2" });
    });
});

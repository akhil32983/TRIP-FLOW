import ItinerariesPreview from "@components/dashboard/ItinerariesPreview";

import { render, screen, waitFor } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";

import type { ItineraryStatus } from "@/types/itinerary";
import { getUserItineraries } from "@/services/itineraryService";

// Secondary dependency mocks
vi.mock("@/services/itineraryService", () => ({
    getUserItineraries: vi.fn(),
}));

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
    }: {
        label: string;
        onClick?: () => void;
        disabled?: boolean;
    }) => (
        <button onClick={onClick} disabled={disabled}>
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
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders loading state initially", () => {
        vi.mocked(getUserItineraries).mockImplementation(
            () => new Promise(() => {})
        );

        render(<ItinerariesPreview />);

        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });

    it("renders itineraries after loading", async () => {
        vi.mocked(getUserItineraries).mockResolvedValue({
            page: mockItineraries,
            currentPage: 0,
            totalPages: 1,
            totalItems: 2,
            itemsPerPage: 10,
            isLastPage: true,
        });

        render(<ItinerariesPreview />);

        await waitFor(() => {
            expect(screen.getByText("Japan Trip")).toBeInTheDocument();
            expect(screen.getByText("Adventure in Peru")).toBeInTheDocument();
        });
    });

    it("renders as section element", async () => {
        vi.mocked(getUserItineraries).mockResolvedValue({
            page: mockItineraries,
            currentPage: 0,
            totalPages: 1,
            totalItems: 2,
            itemsPerPage: 10,
            isLastPage: true,
        });

        const { container } = render(<ItinerariesPreview />);

        await waitFor(() => {
            const section = container.querySelector("section");
            expect(section).toBeInTheDocument();
        });
    });

    it("renders itinerary links with correct href", async () => {
        vi.mocked(getUserItineraries).mockResolvedValue({
            page: mockItineraries,
            currentPage: 0,
            totalPages: 1,
            totalItems: 2,
            itemsPerPage: 10,
            isLastPage: true,
        });

        render(<ItinerariesPreview />);

        await waitFor(() => {
            const links = screen.getAllByRole("link");
            expect(links.length).toBe(2);
            expect(links[0]).toHaveAttribute("href", "/itineraries/1");
            expect(links[1]).toHaveAttribute("href", "/itineraries/2");
        });
    });

    it("renders badges for status and tags", async () => {
        vi.mocked(getUserItineraries).mockResolvedValue({
            page: mockItineraries,
            currentPage: 0,
            totalPages: 1,
            totalItems: 2,
            itemsPerPage: 10,
            isLastPage: true,
        });

        render(<ItinerariesPreview />);

        await waitFor(() => {
            const badges = screen.getAllByTestId("badge");
            expect(badges.length).toBeGreaterThan(0);
        });
    });

    it("renders itinerary details correctly", async () => {
        vi.mocked(getUserItineraries).mockResolvedValue({
            page: mockItineraries,
            currentPage: 0,
            totalPages: 1,
            totalItems: 2,
            itemsPerPage: 10,
            isLastPage: true,
        });

        render(<ItinerariesPreview />);

        await waitFor(() => {
            expect(screen.getByText("Tokyo")).toBeInTheDocument();
            expect(screen.getByText("2024-06-15")).toBeInTheDocument();
            expect(screen.getByText(/7\s+días/)).toBeInTheDocument();
            expect(screen.getByText(/2\s+personas/)).toBeInTheDocument();
            expect(screen.getByText(/3000\s+€/)).toBeInTheDocument();
        });
    });

    it("renders load more button when not last page", async () => {
        vi.mocked(getUserItineraries).mockResolvedValue({
            page: mockItineraries,
            currentPage: 0,
            totalPages: 2,
            totalItems: 15,
            itemsPerPage: 10,
            isLastPage: false,
        });

        render(<ItinerariesPreview />);

        await waitFor(() => {
            expect(screen.getByText("Cargar más")).toBeInTheDocument();
        });
    });

    it("does not render load more button on last page", async () => {
        vi.mocked(getUserItineraries).mockResolvedValue({
            page: mockItineraries,
            currentPage: 0,
            totalPages: 1,
            totalItems: 2,
            itemsPerPage: 10,
            isLastPage: true,
        });

        render(<ItinerariesPreview />);

        await waitFor(() => {
            expect(screen.queryByText("Cargar más")).not.toBeInTheDocument();
        });
    });

    it("renders empty state when no itineraries", async () => {
        vi.mocked(getUserItineraries).mockResolvedValue({
            page: [],
            currentPage: 0,
            totalPages: 0,
            totalItems: 0,
            itemsPerPage: 10,
            isLastPage: true,
        });

        render(<ItinerariesPreview />);

        await waitFor(() => {
            expect(
                screen.getByText("No tienes itinerarios todavía.")
            ).toBeInTheDocument();
            expect(screen.getByText("Crear itinerario")).toBeInTheDocument();
        });
    });

    it("handles singular person count correctly", async () => {
        const singlePersonItinerary = [
            {
                ...mockItineraries[1],
                people: 1,
            },
        ];

        vi.mocked(getUserItineraries).mockResolvedValue({
            page: singlePersonItinerary,
            currentPage: 0,
            totalPages: 1,
            totalItems: 1,
            itemsPerPage: 10,
            isLastPage: true,
        });

        render(<ItinerariesPreview />);

        await waitFor(() => {
            expect(screen.getByText(/1\s+persona/)).toBeInTheDocument();
        });
    });

    it("renders itinerary icons correctly", async () => {
        vi.mocked(getUserItineraries).mockResolvedValue({
            page: mockItineraries,
            currentPage: 0,
            totalPages: 1,
            totalItems: 2,
            itemsPerPage: 10,
            isLastPage: true,
        });

        render(<ItinerariesPreview />);

        await waitFor(() => {
            expect(screen.getByText("🗾")).toBeInTheDocument();
            expect(screen.getByText("🏔️")).toBeInTheDocument();
        });
    });

    it("renders all stat labels", async () => {
        vi.mocked(getUserItineraries).mockResolvedValue({
            page: mockItineraries,
            currentPage: 0,
            totalPages: 1,
            totalItems: 2,
            itemsPerPage: 10,
            isLastPage: true,
        });

        render(<ItinerariesPreview />);

        await waitFor(() => {
            const labels = screen.getAllByText(
                /Fechas|Duración|Integrantes|Presupuesto/
            );
            expect(labels.length).toBeGreaterThan(0);
        });
    });

    it("renders correct number of tags", async () => {
        vi.mocked(getUserItineraries).mockResolvedValue({
            page: mockItineraries,
            currentPage: 0,
            totalPages: 1,
            totalItems: 2,
            itemsPerPage: 10,
            isLastPage: true,
        });

        render(<ItinerariesPreview />);

        await waitFor(() => {
            expect(screen.getByText("culture")).toBeInTheDocument();
            expect(screen.getByText("gastronomy")).toBeInTheDocument();
            expect(screen.getByText("adventure")).toBeInTheDocument();
            expect(screen.getByText("nature")).toBeInTheDocument();
        });
    });
});

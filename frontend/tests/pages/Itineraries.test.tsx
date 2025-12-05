import Itineraries from "@pages/itineraries/Itineraries";

import { render, screen, waitFor } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as itineraryService from "@/services/itineraryService";

// Mock the itinerary service
vi.mock("@/services/itineraryService", () => ({
    getUserItineraries: vi.fn(),
}));

// Secondary dependencies mocks
vi.mock("@/layouts/AppLayout", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="app-layout">{children}</div>
    ),
}));

// Fix: Mock ItinerariesHeader instead of DashboardHeader
vi.mock("@/components/dashboard/headers/ItinerariesHeader", () => ({
    default: ({ children }: any) => (
        <header data-testid="itineraries-header">
            <h1>Tus itinerarios</h1>
            {children}
        </header>
    ),
}));

vi.mock("@/components/shared/Searchbar", () => ({
    default: () => <div data-testid="searchbar" />,
}));

vi.mock("@/components/dashboard/ItinerariesPreview", () => ({
    default: () => <section data-testid="itineraries-preview" />,
}));

vi.mock("@/components/shared/Button", () => ({
    default: () => <button data-testid="button" />,
}));

const mockItinerariesResponse = {
    page: [],
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 10,
    isLastPage: true,
};

describe("Itineraries Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(itineraryService.getUserItineraries).mockResolvedValue(
            mockItinerariesResponse
        );
    });

    it("renders itineraries page", async () => {
        render(<Itineraries />);

        await waitFor(() => {
            expect(screen.getByTestId("app-layout")).toBeInTheDocument();
        });
    });

    it("renders itineraries header", async () => {
        render(<Itineraries />);

        await waitFor(() => {
            expect(screen.getByTestId("itineraries-header")).toBeInTheDocument();
        });
    });

    it("renders page title", async () => {
        render(<Itineraries />);

        await waitFor(() => {
            expect(screen.getByText("Tus itinerarios")).toBeInTheDocument();
        });
    });

    it("renders searchbar", async () => {
        render(<Itineraries />);

        await waitFor(() => {
            expect(screen.getByTestId("searchbar")).toBeInTheDocument();
        });
    });

    it("renders itineraries preview", async () => {
        render(<Itineraries />);

        await waitFor(() => {
            expect(screen.getByTestId("itineraries-preview")).toBeInTheDocument();
        });
    });

    it("renders all main components", async () => {
        render(<Itineraries />);

        await waitFor(() => {
            expect(screen.getByTestId("itineraries-header")).toBeInTheDocument();
            expect(screen.getByTestId("searchbar")).toBeInTheDocument();
            expect(screen.getByTestId("itineraries-preview")).toBeInTheDocument();
        });
    });

    it("wraps content in AppLayout", async () => {
        const { container } = render(<Itineraries />);

        await waitFor(() => {
            const appLayout = container.querySelector('[data-testid="app-layout"]');
            expect(appLayout).toBeInTheDocument();
        });
    });

    it("fetches itineraries on mount", async () => {
        render(<Itineraries />);

        await waitFor(() => {
            expect(itineraryService.getUserItineraries).toHaveBeenCalledWith(
                { page: 0, size: 10 },
                ""
            );
        });
    });
});
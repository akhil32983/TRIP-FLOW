import { render, screen, waitFor } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Recent from "@components/dashboard/Recent";
import * as itineraryService from "@services/itineraryService";
import type { ItineraryStatus } from "@/types/itinerary";

// Itinerary service mock
vi.mock("@services/itineraryService");

// Secondary component mocks
vi.mock("@components/shared/Button", () => ({
  default: ({ label, to }: { label: string; to: string }) => (
    <a href={to}>{label}</a>
  ),
}));

vi.mock("@components/shared/Badge", () => ({
  default: ({ title, status }: { title?: string; status?: string }) => (
    <span data-testid="badge">{title || status}</span>
  ),
}));

vi.mock("@components/shared/ProgressBar", () => ({
  default: ({ progress }: { progress: number }) => (
    <div data-testid="progress-bar" data-progress={progress} />
  ),
}));

vi.mock("@components/shared/Loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

const mockItineraries = {
  page: [
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
  ],
  currentPage: 0,
  totalPages: 1,
  totalItems: 2,
  itemsPerPage: 5,
  isLastPage: true,
};

describe("Recent Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(itineraryService.getUserItineraries).mockResolvedValue(mockItineraries);
  });

  it("renders loading state initially", async () => {
    vi.mocked(itineraryService.getUserItineraries).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockItineraries), 100))
    );

    render(<Recent />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();

    // Esperar a que termine de cargar
    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });
  });

  it("renders recent itineraries after loading", async () => {
    render(<Recent />);

    await waitFor(() => {
      expect(screen.getByText("Japan Trip")).toBeInTheDocument();
    });

    expect(screen.getByText("Adventure in Peru")).toBeInTheDocument();
  });

  it("renders itinerary details correctly", async () => {
    render(<Recent />);

    await waitFor(() => {
      expect(screen.getByText(/Tokyo/)).toBeInTheDocument();
    });

    expect(screen.getByText(/culture/)).toBeInTheDocument();
    expect(screen.getByText(/gastronomy/)).toBeInTheDocument();
  });

  it("renders progress bars with correct values", async () => {
    render(<Recent />);

    await waitFor(() => {
      const progressBars = screen.getAllByTestId("progress-bar");
      expect(progressBars[0]).toHaveAttribute("data-progress", "75");
    });
  });

  it("renders 'Ver todos' button", async () => {
    render(<Recent />);

    await waitFor(() => {
      expect(screen.getByText("Ver todos")).toBeInTheDocument();
    });
  });

  it("handles empty itineraries", async () => {
    vi.mocked(itineraryService.getUserItineraries).mockResolvedValue({
      page: [],
      currentPage: 0,
      totalPages: 0,
      totalItems: 0,
      itemsPerPage: 5,
      isLastPage: true,
    });

    render(<Recent />);

    await waitFor(() => {
      expect(screen.queryByText("Japan Trip")).not.toBeInTheDocument();
    });
  });
});
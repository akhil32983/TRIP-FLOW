import ItinerarySection from "@components/dashboard/itineraries/ItinerarySection";

import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

import type { ItineraryDay } from "@/types/itinerary";

// Mock DayCard
vi.mock("@/components/dashboard/itineraries/DayCard", () => ({
    default: ({ day, onAddActivity }: any) => (
        <div data-testid={`day-${day.day}`}>
            <span>Day {day.day}</span>
            <button onClick={onAddActivity}>Add Activity</button>
        </div>
    )
}));

// Mock useActivityManager
const mockHandleAddActivity = vi.fn();
const mockHandleRemoveActivity = vi.fn();
const mockHandleUpdateActivity = vi.fn();
const mockHandleUpdateActivityLocation = vi.fn();

vi.mock("@/hooks/useActivityManager", () => ({
    useActivityManager: () => ({
        handleAddActivity: mockHandleAddActivity,
        handleRemoveActivity: mockHandleRemoveActivity,
        handleUpdateActivity: mockHandleUpdateActivity,
        handleUpdateActivityLocation: mockHandleUpdateActivityLocation,
    })
}));

describe("ItinerarySection Component", () => {
    const mockInitialDate = "2024-01-01";
    const mockDays: ItineraryDay[] = [
        { day: 1, activities: [] },
        { day: 2, activities: [] }
    ];
    const mockOnDaysChange = vi.fn();
    const mockOnAddNewDay = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders empty state when no days", () => {
        render(
            <ItinerarySection
                initialDate={mockInitialDate}
                days={[]}
                onDaysChange={mockOnDaysChange}
                onAddNewDay={mockOnAddNewDay}
            />
        );

        expect(screen.getByText("No hay días planeados aún")).toBeInTheDocument();
        expect(screen.getByText("Añadir Primer Día")).toBeInTheDocument();
    });

    it("calls onAddNewDay when empty state button clicked", () => {
        render(
            <ItinerarySection
                initialDate={mockInitialDate}
                days={[]}
                onDaysChange={mockOnDaysChange}
                onAddNewDay={mockOnAddNewDay}
            />
        );

        fireEvent.click(screen.getByText("Añadir Primer Día"));
        expect(mockOnAddNewDay).toHaveBeenCalled();
    });

    it("renders day cards", () => {
        render(
            <ItinerarySection
                initialDate={mockInitialDate}
                days={mockDays}
                onDaysChange={mockOnDaysChange}
                onAddNewDay={mockOnAddNewDay}
            />
        );

        expect(screen.getByTestId("day-1")).toBeInTheDocument();
        expect(screen.getByTestId("day-2")).toBeInTheDocument();
    });

    it("passes add activity handler to DayCard", () => {
        render(
            <ItinerarySection
                initialDate={mockInitialDate}
                days={mockDays}
                onDaysChange={mockOnDaysChange}
                onAddNewDay={mockOnAddNewDay}
            />
        );

        const addBtn = screen.getByTestId("day-1").querySelector("button");
        fireEvent.click(addBtn!);

        expect(mockHandleAddActivity).toHaveBeenCalledWith(0);
    });
});

import DayCard from "@components/dashboard/DayCard";

import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";
import type { ItineraryDay } from "@/types/itinerary";

// Secondary dependencies mocks
vi.mock("@/components/shared/Button", () => ({
    default: ({ onClick, style, label, children }: any) => (
        <button
            data-testid="button"
            onClick={onClick}
            data-style={style?.join(",")}>
            {label}
            {children}
        </button>
    ),
}));

vi.mock("@components/form/ActivityForm", () => ({
    default: ({ activity, activityIndex, onRemoveActivity, isExpanded, onToggleExpand }: any) => (
        <div data-testid="activity-form" data-index={activityIndex} data-expanded={isExpanded}>
            <span>{activity.activity}</span>
            <button onClick={onRemoveActivity}>Remove</button>
            <button onClick={onToggleExpand}>Toggle</button>
        </div>
    ),
}));

const mockDay: ItineraryDay = {
    day: 1,
    activities: [
        {
            time: "09:00",
            duration: "2h",
            activity: "Visita al museo",
            details: "Tour guiado",
            location: {
                name: "Museo Nacional",
                address: "Calle Principal 123",
                coordinates: {
                    latitude: 40.4168,
                    longitude: -3.7038,
                }
            },
        },
    ],
};

const mockEmptyDay: ItineraryDay = {
    day: 2,
    activities: [],
};

describe("DayCard Component", () => {
    it("renders day card", () => {
        const { container } = render(
            <DayCard
                day={mockDay}
                date="2025-07-15"
                onAddActivity={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        expect(container.firstChild).toBeInTheDocument();
    });

    it("renders day number in title", () => {
        render(
            <DayCard
                day={mockDay}
                date="2025-07-15"
                onAddActivity={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        expect(screen.getByText(/Día 1/)).toBeInTheDocument();
    });

    it("renders add activity button", () => {
        render(
            <DayCard
                day={mockDay}
                date="2025-07-15"
                onAddActivity={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const button = screen.getByRole("button", { name: /Añadir actividad/i });
        expect(button).toBeInTheDocument();
    });

    it("calls onAddActivity when add button is clicked", () => {
        const mockOnAddActivity = vi.fn();

        render(
            <DayCard
                day={mockDay}
                date="2025-07-15"
                onAddActivity={mockOnAddActivity}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const button = screen.getByRole("button", { name: /Añadir actividad/i });
        fireEvent.click(button);

        expect(mockOnAddActivity).toHaveBeenCalledTimes(1);
    });



    it("renders activity forms for each activity", () => {
        render(
            <DayCard
                day={mockDay}
                date="2025-07-15"
                onAddActivity={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const activityForms = screen.getAllByTestId("activity-form");
        expect(activityForms).toHaveLength(1);
    });

    it("renders empty state with add button only", () => {
        render(
            <DayCard
                day={mockEmptyDay}
                date="2025-07-15"
                onAddActivity={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        expect(
            screen.getByRole("button", { name: /Añadir actividad/i })
        ).toBeInTheDocument();
    });

    it("calls onAddActivity from add button", () => {
        const mockOnAddActivity = vi.fn();

        render(
            <DayCard
                day={mockEmptyDay}
                date="2025-07-15"
                onAddActivity={mockOnAddActivity}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const addButton = screen.getByRole("button", { name: /Añadir actividad/i });
        fireEvent.click(addButton);

        expect(mockOnAddActivity).toHaveBeenCalledTimes(1);
    });

    it("passes correct props to ActivityForm", () => {
        render(
            <DayCard
                day={mockDay}
                date="2025-07-15"
                onAddActivity={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        expect(screen.getByText("Visita al museo")).toBeInTheDocument();
    });

    it("calls onRemoveActivity when activity is removed", () => {
        const mockOnRemoveActivity = vi.fn();

        render(
            <DayCard
                day={mockDay}
                date="2025-07-15"
                onAddActivity={vi.fn()}
                onRemoveActivity={mockOnRemoveActivity}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const removeButton = screen.getByText("Remove");
        fireEvent.click(removeButton);

        expect(mockOnRemoveActivity).toHaveBeenCalledWith(0);
    });

    it("renders multiple activities", () => {
        const dayWithMultipleActivities: ItineraryDay = {
            day: 1,
            activities: [
                { ...mockDay.activities[0] },
                { ...mockDay.activities[0], activity: "Segunda actividad" },
            ],
        };

        render(
            <DayCard
                day={dayWithMultipleActivities}
                date="2025-07-15"
                onAddActivity={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const activityForms = screen.getAllByTestId("activity-form");
        expect(activityForms).toHaveLength(2);
    });

    it("renders day title as h4", () => {
        const { container } = render(
            <DayCard
                day={mockDay}
                date="2025-07-15"
                onAddActivity={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const h3 = container.querySelector("h3");
        expect(h3).toBeInTheDocument();
        expect(h3?.textContent).toContain("Día 1");
    });
});

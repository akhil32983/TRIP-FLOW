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
    default: ({ activity, activityIndex, onRemoveActivity }: any) => (
        <div data-testid="activity-form" data-index={activityIndex}>
            <span>{activity.activity}</span>
            <button onClick={onRemoveActivity}>Remove</button>
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
                totalDays={3}
                onAddActivity={vi.fn()}
                onRemoveDay={vi.fn()}
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
                totalDays={3}
                onAddActivity={vi.fn()}
                onRemoveDay={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        expect(screen.getByText("Día 1")).toBeInTheDocument();
    });

    it("renders add activity button", () => {
        render(
            <DayCard
                day={mockDay}
                totalDays={3}
                onAddActivity={vi.fn()}
                onRemoveDay={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const buttons = screen.getAllByTestId("button");
        expect(buttons.length).toBeGreaterThan(0);
    });

    it("calls onAddActivity when add button is clicked", () => {
        const mockOnAddActivity = vi.fn();

        render(
            <DayCard
                day={mockDay}
                totalDays={3}
                onAddActivity={mockOnAddActivity}
                onRemoveDay={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const buttons = screen.getAllByTestId("button");
        fireEvent.click(buttons[0]);

        expect(mockOnAddActivity).toHaveBeenCalledTimes(1);
    });

    it("renders remove day button when totalDays > 1", () => {
        render(
            <DayCard
                day={mockDay}
                totalDays={3}
                onAddActivity={vi.fn()}
                onRemoveDay={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const buttons = screen.getAllByTestId("button");
        expect(buttons.length).toBe(2);
    });

    it("does not render remove day button when totalDays is 1", () => {
        render(
            <DayCard
                day={mockDay}
                totalDays={1}
                onAddActivity={vi.fn()}
                onRemoveDay={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const buttons = screen.getAllByTestId("button");
        expect(buttons.length).toBe(1);
    });

    it("calls onRemoveDay when remove button is clicked", () => {
        const mockOnRemoveDay = vi.fn();

        render(
            <DayCard
                day={mockDay}
                totalDays={3}
                onAddActivity={vi.fn()}
                onRemoveDay={mockOnRemoveDay}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const buttons = screen.getAllByTestId("button");
        fireEvent.click(buttons[1]);

        expect(mockOnRemoveDay).toHaveBeenCalledTimes(1);
    });

    it("renders activity forms for each activity", () => {
        render(
            <DayCard
                day={mockDay}
                totalDays={3}
                onAddActivity={vi.fn()}
                onRemoveDay={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const activityForms = screen.getAllByTestId("activity-form");
        expect(activityForms).toHaveLength(1);
    });

    it("renders empty state when no activities", () => {
        render(
            <DayCard
                day={mockEmptyDay}
                totalDays={3}
                onAddActivity={vi.fn()}
                onRemoveDay={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        expect(
            screen.getByText(/No hay actividades planeadas/)
        ).toBeInTheDocument();
    });

    it("renders add first activity button in empty state", () => {
        render(
            <DayCard
                day={mockEmptyDay}
                totalDays={3}
                onAddActivity={vi.fn()}
                onRemoveDay={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        expect(
            screen.getByText("Añadir primera actividad")
        ).toBeInTheDocument();
    });

    it("calls onAddActivity from empty state button", () => {
        const mockOnAddActivity = vi.fn();

        render(
            <DayCard
                day={mockEmptyDay}
                totalDays={3}
                onAddActivity={mockOnAddActivity}
                onRemoveDay={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const addButton = screen.getByText("Añadir primera actividad");
        fireEvent.click(addButton);

        expect(mockOnAddActivity).toHaveBeenCalledTimes(1);
    });

    it("passes correct props to ActivityForm", () => {
        render(
            <DayCard
                day={mockDay}
                totalDays={3}
                onAddActivity={vi.fn()}
                onRemoveDay={vi.fn()}
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
                totalDays={3}
                onAddActivity={vi.fn()}
                onRemoveDay={vi.fn()}
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
                totalDays={3}
                onAddActivity={vi.fn()}
                onRemoveDay={vi.fn()}
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
                totalDays={3}
                onAddActivity={vi.fn()}
                onRemoveDay={vi.fn()}
                onRemoveActivity={vi.fn()}
                onUpdateActivity={vi.fn()}
                onUpdateActivityLocation={vi.fn()}
            />
        );

        const h4 = container.querySelector("h4");
        expect(h4).toBeInTheDocument();
        expect(h4?.textContent).toBe("Día 1");
    });
});

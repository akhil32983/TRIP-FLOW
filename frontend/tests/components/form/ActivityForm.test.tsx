import ActivityForm from "@components/form/ActivityForm";

import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

import type { Activity } from "@/types/itinerary";

// Secondary dependencies mocks
vi.mock("@/hooks/useActivityFormFields", () => ({
    useActivityFormFields: (activity: Activity) => ({
        activityFields: [
            {
                name: "time",
                label: "Hora",
                type: "time",
                value: activity.time,
                placeholder: "",
                required: true,
            },
            {
                name: "duration",
                label: "Duración",
                type: "text",
                value: activity.duration,
                placeholder: "Ej: 2h",
                required: false,
            },
            {
                name: "activity",
                label: "Actividad",
                type: "text",
                value: activity.activity,
                placeholder: "Ej: Visita al museo",
                required: true,
            },
        ],
        detailsField: {
            name: "details",
            label: "Detalles",
            type: "textarea",
            value: activity.details,
            placeholder: "Descripción detallada...",
            required: false,
        },
        locationFields: [
            {
                name: "name",
                label: "Nombre del lugar",
                type: "text",
                value: activity.location.name,
                placeholder: "Ej: Museo del Louvre",
                required: false,
            },
            {
                name: "address",
                label: "Dirección",
                type: "text",
                value: activity.location.address,
                placeholder: "Calle Principal 123",
                required: false,
            },
        ],
        getFieldHandler: () => vi.fn(),
    }),
}));

vi.mock("@components/shared/Button", () => ({
    default: ({ onClick, style, children }: any) => (
        <button
            data-testid="button"
            onClick={onClick}
            data-style={style?.join(",")}>
            {children}
        </button>
    ),
}));

vi.mock("@components/form/FormGroup", () => ({
    default: ({ field, handleChange, fullWidth }: any) => (
        <div data-testid="form-group" data-fullwidth={fullWidth}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
                id={field.name}
                type={field.type}
                name={field.name}
                value={field.value}
                placeholder={field.placeholder}
                onChange={handleChange}
            />
        </div>
    ),
}));

vi.mock("@components/form/LocationForm", () => ({
    default: ({ onLocationUpdate }: any) => (
        <div data-testid="location-form">
            <span>Location Form</span>
            <button onClick={() => onLocationUpdate("name", "New Location")}>
                Update Location
            </button>
        </div>
    ),
}));

vi.mock("lucide-react", () => ({
    ChevronUp: () => <span data-testid="chevron-up-icon">ChevronUp</span>,
    Trash2: () => <span data-testid="trash-icon">Trash</span>,
}));

const mockActivity: Activity = {
    time: "09:00",
    duration: "2h",
    activity: "Visita al museo",
    details: "Tour guiado por las salas principales",
    location: {
        name: "Museo Nacional",
        address: "Calle Principal 123",
        coordinates: {
            latitude: 40.4168,
            longitude: -3.7038,
        }
    },
};

const mockEmptyActivity: Activity = {
    time: "",
    duration: "",
    activity: "",
    details: "",
    location: {
        name: "",
        address: "",
        coordinates: {
            latitude: 0,
            longitude: 0,
        }
    },
};

describe("ActivityForm Component", () => {
    it("renders activity form", () => {
        const { container } = render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={false}
                onToggleExpand={vi.fn()}
            />
        );

        expect(container.firstChild).toBeInTheDocument();
    });

    it("renders activity header with title", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={false}
                onToggleExpand={vi.fn()}
            />
        );

        expect(screen.getByText("Visita al museo")).toBeInTheDocument();
    });

    it("renders correct activity number when activity title is empty", () => {
        render(
            <ActivityForm
                activity={mockEmptyActivity}
                activityIndex={2}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={false}
                onToggleExpand={vi.fn()}
            />
        );

        expect(screen.getByText("Actividad 3")).toBeInTheDocument();
    });



    it("renders remove activity button in summary view", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={false}
                onToggleExpand={vi.fn()}
            />
        );

        expect(screen.getByTestId("button")).toBeInTheDocument();
    });

    it("renders trash icon in remove button", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={false}
                onToggleExpand={vi.fn()}
            />
        );

        expect(screen.getByTestId("trash-icon")).toBeInTheDocument();
    });

    it("calls onRemoveActivity when remove button is clicked", () => {
        const mockOnRemoveActivity = vi.fn();

        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={mockOnRemoveActivity}
                isExpanded={false}
                onToggleExpand={vi.fn()}
            />
        );

        const button = screen.getByTestId("button");
        fireEvent.click(button);

        expect(mockOnRemoveActivity).toHaveBeenCalledTimes(1);
    });

    it("renders all activity fields when expanded", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={true}
                onToggleExpand={vi.fn()}
            />
        );

        const formGroups = screen.getAllByTestId("form-group");
        expect(formGroups.length).toBeGreaterThan(0);
    });

    it("renders time field", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={true}
                onToggleExpand={vi.fn()}
            />
        );

        expect(screen.getByLabelText("Hora")).toBeInTheDocument();
    });

    it("renders duration field", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={true}
                onToggleExpand={vi.fn()}
            />
        );

        expect(screen.getByLabelText("Duración")).toBeInTheDocument();
    });

    it("renders activity field", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={true}
                onToggleExpand={vi.fn()}
            />
        );

        expect(screen.getByLabelText("Actividad")).toBeInTheDocument();
    });

    it("renders details field", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={true}
                onToggleExpand={vi.fn()}
            />
        );

        expect(screen.getByLabelText("Detalles")).toBeInTheDocument();
    });

    it("renders details field with fullWidth", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={true}
                onToggleExpand={vi.fn()}
            />
        );

        const formGroups = screen.getAllByTestId("form-group");
        const detailsGroup = formGroups.find((group) =>
            group.querySelector('input[name="details"]')
        );

        expect(detailsGroup).toHaveAttribute("data-fullwidth", "true");
    });

    it("renders LocationForm component", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={true}
                onToggleExpand={vi.fn()}
            />
        );

        expect(screen.getByTestId("location-form")).toBeInTheDocument();
    });

    it("calls onLocationUpdate when location is updated", () => {
        const mockOnLocationUpdate = vi.fn();

        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={mockOnLocationUpdate}
                onRemoveActivity={vi.fn()}
                isExpanded={true}
                onToggleExpand={vi.fn()}
            />
        );

        const updateButton = screen.getByText("Update Location");
        fireEvent.click(updateButton);

        expect(mockOnLocationUpdate).toHaveBeenCalledTimes(1);
    });

    it("renders with empty activity", () => {
        render(
            <ActivityForm
                activity={mockEmptyActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={false}
                onToggleExpand={vi.fn()}
            />
        );

        expect(screen.getByText("Actividad 1")).toBeInTheDocument();
    });

    it("renders form row container", () => {
        const { container } = render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={true}
                onToggleExpand={vi.fn()}
            />
        );

        const formRow = container.querySelector('[class*="formRow"]');
        expect(formRow).toBeInTheDocument();
    });



    it("renders activity title in summary view", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
                isExpanded={false}
                onToggleExpand={vi.fn()}
            />
        );

        expect(screen.getByText("Visita al museo")).toBeInTheDocument();
    });
});

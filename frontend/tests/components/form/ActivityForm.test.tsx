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
    Crosshair: () => <span data-testid="crosshair-icon">Crosshair</span>,
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
        latitude: 40.4168,
        longitude: -3.7038,
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
        latitude: 0,
        longitude: 0,
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
            />
        );

        expect(screen.getByText("Actividad 1")).toBeInTheDocument();
    });

    it("renders correct activity number", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={2}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
            />
        );

        expect(screen.getByText("Actividad 3")).toBeInTheDocument();
    });

    it("renders crosshair icon in header", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
            />
        );

        expect(screen.getByTestId("crosshair-icon")).toBeInTheDocument();
    });

    it("renders remove activity button", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
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
            />
        );

        const button = screen.getByTestId("button");
        fireEvent.click(button);

        expect(mockOnRemoveActivity).toHaveBeenCalledTimes(1);
    });

    it("renders all activity fields", () => {
        render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
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
            />
        );

        expect(screen.getByText("Actividad 1")).toBeInTheDocument();
    });

    it("renders activity card container", () => {
        const { container } = render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
            />
        );

        const activityCard = container.querySelector('[class*="activityCard"]');
        expect(activityCard).toBeInTheDocument();
    });

    it("renders activity header", () => {
        const { container } = render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
            />
        );

        const activityHeader = container.querySelector(
            '[class*="activityHeader"]'
        );
        expect(activityHeader).toBeInTheDocument();
    });

    it("renders form row container", () => {
        const { container } = render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
            />
        );

        const formRow = container.querySelector('[class*="formRow"]');
        expect(formRow).toBeInTheDocument();
    });

    it("renders location form container", () => {
        const { container } = render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
            />
        );

        const locationForm = container.querySelector('[class*="locationForm"]');
        expect(locationForm).toBeInTheDocument();
    });

    it("renders activity title as h4", () => {
        const { container } = render(
            <ActivityForm
                activity={mockActivity}
                activityIndex={0}
                onActivityUpdate={vi.fn()}
                onLocationUpdate={vi.fn()}
                onRemoveActivity={vi.fn()}
            />
        );

        const h4 = container.querySelector("h4");
        expect(h4).toBeInTheDocument();
        expect(h4?.textContent).toBe("Actividad 1");
    });
});

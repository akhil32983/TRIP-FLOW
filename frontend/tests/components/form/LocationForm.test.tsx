import LocationForm from "@components/form/LocationForm";

import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

import type { Field } from "@components/form/FormGroup";

// Secondary dependencies mocks
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
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    ),
}));

vi.mock("lucide-react", () => ({
    MapPin: () => <span data-testid="map-pin-icon">MapPin</span>,
}));

const mockFields: Field[] = [
    {
        name: "name",
        label: "Nombre del lugar",
        type: "text",
        value: "Museo del Louvre",
        placeholder: "Ej: Museo del Louvre",
        required: false,
    },
    {
        name: "address",
        label: "Dirección",
        type: "text",
        value: "Rue de Rivoli, 75001 Paris",
        placeholder: "Calle Principal 123",
        required: false,
    },
];

const mockEmptyFields: Field[] = [
    {
        name: "name",
        label: "Nombre del lugar",
        type: "text",
        value: "",
        placeholder: "Ej: Museo del Louvre",
        required: false,
    },
    {
        name: "address",
        label: "Dirección",
        type: "text",
        value: "",
        placeholder: "Calle Principal 123",
        required: false,
    },
];

const mockSingleField: Field[] = [
    {
        name: "name",
        label: "Nombre del lugar",
        type: "text",
        value: "Torre Eiffel",
        placeholder: "Ej: Museo del Louvre",
        required: false,
    },
];

const mockMultipleFields: Field[] = [
    {
        name: "name",
        label: "Nombre del lugar",
        type: "text",
        value: "",
        placeholder: "",
        required: false,
    },
    {
        name: "address",
        label: "Dirección",
        type: "text",
        value: "",
        placeholder: "",
        required: false,
    },
    {
        name: "latitude",
        label: "Latitud",
        type: "number",
        value: "",
        placeholder: "",
        required: false,
    },
    {
        name: "longitude",
        label: "Longitud",
        type: "number",
        value: "",
        placeholder: "",
        required: false,
    },
];

describe("LocationForm Component", () => {
    it("renders location form", () => {
        const { container } = render(
            <LocationForm fields={mockFields} onLocationUpdate={vi.fn()} />
        );

        expect(container.firstChild).toBeInTheDocument();
    });

    it("renders form header with title", () => {
        render(<LocationForm fields={mockFields} onLocationUpdate={vi.fn()} />);

        expect(screen.getByText("¿Dónde exactamente?")).toBeInTheDocument();
    });

    it("renders map pin icon in header", () => {
        render(<LocationForm fields={mockFields} onLocationUpdate={vi.fn()} />);

        expect(screen.getByTestId("map-pin-icon")).toBeInTheDocument();
    });

    it("renders all form groups", () => {
        render(<LocationForm fields={mockFields} onLocationUpdate={vi.fn()} />);

        const formGroups = screen.getAllByTestId("form-group");
        expect(formGroups).toHaveLength(2);
    });

    it("renders form groups with fullWidth prop", () => {
        render(<LocationForm fields={mockFields} onLocationUpdate={vi.fn()} />);

        const formGroups = screen.getAllByTestId("form-group");
        formGroups.forEach((group) => {
            expect(group).toHaveAttribute("data-fullwidth", "true");
        });
    });

    it("renders name field", () => {
        render(<LocationForm fields={mockFields} onLocationUpdate={vi.fn()} />);

        expect(screen.getByLabelText("Nombre del lugar")).toBeInTheDocument();
    });

    it("renders address field", () => {
        render(<LocationForm fields={mockFields} onLocationUpdate={vi.fn()} />);

        expect(screen.getByLabelText("Dirección")).toBeInTheDocument();
    });

    it("calls onLocationUpdate when field is changed", () => {
        const mockOnLocationUpdate = vi.fn();

        render(
            <LocationForm
                fields={mockFields}
                onLocationUpdate={mockOnLocationUpdate}
            />
        );

        const nameInput = screen.getByLabelText("Nombre del lugar");
        fireEvent.change(nameInput, { target: { value: "Nueva ubicación" } });

        expect(mockOnLocationUpdate).toHaveBeenCalledWith(
            "name",
            "Nueva ubicación"
        );
    });

    it("calls onLocationUpdate with correct field name", () => {
        const mockOnLocationUpdate = vi.fn();

        render(
            <LocationForm
                fields={mockFields}
                onLocationUpdate={mockOnLocationUpdate}
            />
        );

        const addressInput = screen.getByLabelText("Dirección");
        fireEvent.change(addressInput, {
            target: { value: "Calle Nueva 456" },
        });

        expect(mockOnLocationUpdate).toHaveBeenCalledWith(
            "address",
            "Calle Nueva 456"
        );
    });

    it("renders with empty fields", () => {
        render(
            <LocationForm fields={mockEmptyFields} onLocationUpdate={vi.fn()} />
        );

        const formGroups = screen.getAllByTestId("form-group");
        expect(formGroups).toHaveLength(2);
    });

    it("splits fields into two rows evenly", () => {
        const { container } = render(
            <LocationForm
                fields={mockMultipleFields}
                onLocationUpdate={vi.fn()}
            />
        );

        const formRows = container.querySelectorAll('[class*="formRow"]');
        expect(formRows).toHaveLength(2);
    });

    it("renders single field in first row", () => {
        render(
            <LocationForm fields={mockSingleField} onLocationUpdate={vi.fn()} />
        );

        const formGroups = screen.getAllByTestId("form-group");
        expect(formGroups).toHaveLength(1);
    });

    it("renders form header", () => {
        const { container } = render(
            <LocationForm fields={mockFields} onLocationUpdate={vi.fn()} />
        );

        const formHeader = container.querySelector('[class*="formHeader"]');
        expect(formHeader).toBeInTheDocument();
    });

    it("renders form rows", () => {
        const { container } = render(
            <LocationForm fields={mockFields} onLocationUpdate={vi.fn()} />
        );

        const formRows = container.querySelectorAll('[class*="formRow"]');
        expect(formRows.length).toBeGreaterThan(0);
    });

    it("renders title as h6", () => {
        const { container } = render(
            <LocationForm fields={mockFields} onLocationUpdate={vi.fn()} />
        );

        const h6 = container.querySelector("h6");
        expect(h6).toBeInTheDocument();
        expect(h6?.textContent).toBe("¿Dónde exactamente?");
    });

    it("distributes odd number of fields correctly", () => {
        const threeFields: Field[] = [
            ...mockFields,
            {
                name: "city",
                label: "Ciudad",
                type: "text",
                value: "París",
                placeholder: "",
                required: false,
            },
        ];

        render(
            <LocationForm fields={threeFields} onLocationUpdate={vi.fn()} />
        );

        const formGroups = screen.getAllByTestId("form-group");
        expect(formGroups).toHaveLength(3);
    });

    it("renders location form container", () => {
        const { container } = render(
            <LocationForm fields={mockFields} onLocationUpdate={vi.fn()} />
        );

        const locationForm = container.querySelector('[class*="locationForm"]');
        expect(locationForm).toBeInTheDocument();
    });
});

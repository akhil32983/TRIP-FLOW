import ItineraryEditForm from "@components/form/ItineraryEditForm";

import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";

import type { ExtendedItinerary } from "@/types/itinerary";

// Secondary dependencies mocks
vi.mock("@/hooks/useItineraryForm", () => ({
    useItineraryForm: (initialItinerary: ExtendedItinerary) => ({
        itinerary: initialItinerary,
        updateBasicInfo: vi.fn(),
        validateItinerary: vi.fn(() => ({ isValid: true, error: null })),
    }),
}));

vi.mock("@/hooks/useDayManager", () => ({
    useDayManager: () => ({
        handleAddNewDay: vi.fn(),
        handleRemoveDay: vi.fn(),
    }),
}));

vi.mock("@components/dashboard/BasicInfoSection", () => ({
    default: ({ itinerary, onUpdateBasicInfo, onTagsChange }: any) => (
        <div data-testid="basic-info-section">
            <span>Basic Info: {itinerary.title}</span>
            <button onClick={() => onUpdateBasicInfo("title", "Updated Title")}>
                Update Basic Info
            </button>
            <button onClick={() => onTagsChange(["nueva"])}>Update Tags</button>
        </div>
    ),
}));

vi.mock("@components/dashboard/ItinerarySection", () => ({
    default: ({ days, onDaysChange, onAddNewDay, onRemoveDay }: any) => (
        <div data-testid="itinerary-section">
            <span>Days: {days.length}</span>
            <button
                onClick={() =>
                    onDaysChange([...days, { day: days.length + 1 }])
                }>
                Update Days
            </button>
            <button onClick={onAddNewDay}>Add Day</button>
            <button onClick={() => onRemoveDay(0)}>Remove Day</button>
        </div>
    ),
}));

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

vi.mock("lucide-react", () => ({
    Save: () => <span data-testid="save-icon">Save</span>,
}));

const mockItinerary: ExtendedItinerary = {
    id: 1,
    icon: "✈️",
    title: "Viaje a París",
    place: "París, Francia",
    people: 2,
    budget: 2000,
    date: "2024-06-01",
    status: "DRAFT",
    countDays: 3,
    tags: ["romántica", "cultural"],
    days: [
        {
            day: 1,
            activities: [],
        },
        {
            day: 2,
            activities: [],
        },
        {
            day: 3,
            activities: [],
        },
    ],
};

const mockEmptyItinerary: ExtendedItinerary = {
    id: 2,
    icon: "",
    title: "",
    place: "",
    people: 0,
    budget: 0,
    date: "",
    status: "DRAFT",
    countDays: 0,
    tags: [],
    days: [],
};

describe("ItineraryEditForm Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(window, "alert").mockImplementation(() => {});
        vi.spyOn(console, "log").mockImplementation(() => {});
    });

    it("renders itinerary edit form", () => {
        const { container } = render(
            <ItineraryEditForm initialItinerary={mockItinerary} />
        );

        expect(container.firstChild).toBeInTheDocument();
    });

    it("renders form header with itinerary title", () => {
        const { container } = render(
            <ItineraryEditForm initialItinerary={mockItinerary} />
        );

        const h2 = container.querySelector("h2");
        expect(h2?.textContent).toContain("Viaje a París");
    });

    it("renders itinerary icon in header", () => {
        const { container } = render(
            <ItineraryEditForm initialItinerary={mockItinerary} />
        );

        const h2 = container.querySelector("h2");
        expect(h2?.textContent).toContain("✈️");
    });

    it("renders save button in header", () => {
        render(<ItineraryEditForm initialItinerary={mockItinerary} />);

        expect(screen.getByText("Guardar")).toBeInTheDocument();
    });

    it("renders save icon in header button", () => {
        render(<ItineraryEditForm initialItinerary={mockItinerary} />);

        const saveIcons = screen.getAllByTestId("save-icon");
        expect(saveIcons.length).toBeGreaterThan(0);
    });

    it("renders BasicInfoSection component", () => {
        render(<ItineraryEditForm initialItinerary={mockItinerary} />);

        expect(screen.getByTestId("basic-info-section")).toBeInTheDocument();
    });

    it("renders ItinerarySection component", () => {
        render(<ItineraryEditForm initialItinerary={mockItinerary} />);

        expect(screen.getByTestId("itinerary-section")).toBeInTheDocument();
    });

    it("renders footer with save button", () => {
        render(<ItineraryEditForm initialItinerary={mockItinerary} />);

        expect(screen.getByText("Guardar Todo")).toBeInTheDocument();
    });

    it("renders two save buttons", () => {
        render(<ItineraryEditForm initialItinerary={mockItinerary} />);

        const buttons = screen.getAllByTestId("button");
        const saveButtons = buttons.filter((btn) =>
            btn.textContent?.includes("Guardar")
        );
        expect(saveButtons).toHaveLength(2);
    });

    it("calls onSave when save button is clicked", () => {
        const mockOnSave = vi.fn();

        render(
            <ItineraryEditForm
                initialItinerary={mockItinerary}
                onSave={mockOnSave}
            />
        );

        const saveButton = screen.getByText("Guardar");
        fireEvent.click(saveButton);

        expect(mockOnSave).toHaveBeenCalledTimes(1);
    });

    it("calls onSave with itinerary data", () => {
        const mockOnSave = vi.fn();

        render(
            <ItineraryEditForm
                initialItinerary={mockItinerary}
                onSave={mockOnSave}
            />
        );

        const saveButton = screen.getByText("Guardar");
        fireEvent.click(saveButton);

        expect(mockOnSave).toHaveBeenCalledWith(mockItinerary);
    });

    it("renders with empty itinerary", () => {
        render(<ItineraryEditForm initialItinerary={mockEmptyItinerary} />);

        expect(screen.getByTestId("basic-info-section")).toBeInTheDocument();
    });

    it("renders form header container", () => {
        const { container } = render(
            <ItineraryEditForm initialItinerary={mockItinerary} />
        );

        const formHeader = container.querySelector('[class*="formHeader"]');
        expect(formHeader).toBeInTheDocument();
    });

    it("renders form footer container", () => {
        const { container } = render(
            <ItineraryEditForm initialItinerary={mockItinerary} />
        );

        const formFooter = container.querySelector('[class*="formFooter"]');
        expect(formFooter).toBeInTheDocument();
    });

    it("renders edit form container", () => {
        const { container } = render(
            <ItineraryEditForm initialItinerary={mockItinerary} />
        );

        const editForm = container.querySelector('[class*="editForm"]');
        expect(editForm).toBeInTheDocument();
    });

    it("passes correct props to BasicInfoSection", () => {
        render(<ItineraryEditForm initialItinerary={mockItinerary} />);

        expect(
            screen.getByText(/Basic Info: Viaje a París/)
        ).toBeInTheDocument();
    });

    it("passes correct props to ItinerarySection", () => {
        render(<ItineraryEditForm initialItinerary={mockItinerary} />);

        expect(screen.getByText(/Days: 3/)).toBeInTheDocument();
    });

    it("header save button has primary style", () => {
        render(<ItineraryEditForm initialItinerary={mockItinerary} />);

        const buttons = screen.getAllByTestId("button");
        const saveButtons = buttons.filter((btn) =>
            btn.textContent?.includes("Guardar")
        );
        expect(saveButtons[0]).toHaveAttribute("data-style", "primary");
    });

    it("footer save button has primary style", () => {
        render(<ItineraryEditForm initialItinerary={mockItinerary} />);

        const buttons = screen.getAllByTestId("button");
        const saveButtons = buttons.filter((btn) =>
            btn.textContent?.includes("Guardar")
        );
        expect(saveButtons[1]).toHaveAttribute("data-style", "primary");
    });

    it("renders header as h2", () => {
        const { container } = render(
            <ItineraryEditForm initialItinerary={mockItinerary} />
        );

        const h2 = container.querySelector("h2");
        expect(h2).toBeInTheDocument();
    });

    it("works without onSave callback", () => {
        render(<ItineraryEditForm initialItinerary={mockItinerary} />);

        const saveButton = screen.getByText("Guardar");

        expect(() => fireEvent.click(saveButton)).not.toThrow();
    });
});

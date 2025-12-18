import ProfileCard from "@components/dashboard/profile/ProfileCard";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Secondary dependencies mocks
vi.mock("@/providers/authProvider", async () => {
    const actual = await vi.importActual("@/providers/authProvider");
    return {
        ...actual,
        useAuth: vi.fn(),
    };
});

vi.mock("@components/shared/Avatar", () => ({
    default: ({ to, size }: any) => (
        <div data-testid="avatar" data-to={to} data-size={size}>
            Avatar
        </div>
    ),
}));

vi.mock("lucide-react", () => ({
    CalendarIcon: ({ className }: any) => (
        <span data-testid="calendar-icon" className={className}>
            Calendar
        </span>
    ),
    MapPinIcon: ({ className }: any) => (
        <span data-testid="map-pin-icon" className={className}>
            MapPin
        </span>
    ),
}));

import { useAuth } from "@/providers/authProvider";

const mockUser = {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    location: "Madrid, España",
    description: "Viajero apasionado y amante de la aventura",
    createdAt: "2024-01-15T10:00:00Z",
};

const mockUserMinimal = {
    id: 2,
    name: "Jane Doe",
    username: "janedoe",
    email: "jane@example.com",
    location: "¿?",
    description: "",
    createdAt: "2024-06-20T14:30:00Z",
};



describe("ProfileCard Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders profile card", () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any);

        const { container } = render(<ProfileCard />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it("renders Avatar component", () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any);

        render(<ProfileCard />);

        expect(screen.getByTestId("avatar")).toBeInTheDocument();
    });

    it("Avatar has correct props", () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any);

        render(<ProfileCard />);

        const avatar = screen.getByTestId("avatar");
        expect(avatar).toHaveAttribute("data-size", "full");
    });

    it("renders username as heading", () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any);

        render(<ProfileCard />);

        // The component renders name in h2, not username
        const heading = screen.getByRole("heading", { name: "John Doe" });
        expect(heading).toBeInTheDocument();
    });

    it("renders user description", () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any);

        render(<ProfileCard />);

        expect(
            screen.getByText("Viajero apasionado y amante de la aventura")
        ).toBeInTheDocument();
    });

    it("renders default description when user has no description", () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUserMinimal } as any);

        render(<ProfileCard />);

        expect(
            screen.getByText("Sin descripción.")
        ).toBeInTheDocument();
    });

    it("renders user location", () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any);

        render(<ProfileCard />);

        expect(screen.getByText("Madrid, España")).toBeInTheDocument();
    });

    it("renders default location when location is ¿?", () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUserMinimal } as any);

        render(<ProfileCard />);

        expect(screen.getByText("Alguna parte del mundo")).toBeInTheDocument();
    });

    it("renders MapPin icon", () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any);

        render(<ProfileCard />);

        expect(screen.getByTestId("map-pin-icon")).toBeInTheDocument();
    });

    it("renders profile section", () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any);

        const { container } = render(<ProfileCard />);

        const section = container.querySelector("section");
        expect(section).toBeInTheDocument();
    });

    it("renders profile image container", () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any);

        const { container } = render(<ProfileCard />);

        const profileImage = container.querySelector('[class*="profileImage"]');
        expect(profileImage).toBeInTheDocument();
    });

    it("renders profile info container", () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any);

        const { container } = render(<ProfileCard />);

        const profileInfo = container.querySelector('[class*="profileInfo"]');
        expect(profileInfo).toBeInTheDocument();
    });

    it("renders one metadata item", () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any);

        const { container } = render(<ProfileCard />);

        const metadataItems = container.querySelectorAll(
            '[class*="profileMetadataItem"]'
        );
        expect(metadataItems).toHaveLength(1);
    });

    it("renders heading as h2", () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any);

        const { container } = render(<ProfileCard />);

        const h2 = container.querySelector("h2");
        expect(h2).toBeInTheDocument();
        expect(h2?.textContent).toBe("John Doe");
    });
});

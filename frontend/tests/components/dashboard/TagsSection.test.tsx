import TagsSection from "@components/dashboard/TagsSection";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

// Secondary dependencies mocks
vi.mock("@/hooks/useTagsManager", () => ({
    useTagsManager: () => ({
        newTag: "",
        setNewTag: vi.fn(),
        handleAddTag: vi.fn(),
        handleRemoveTag: vi.fn(),
        handleTagKeyPress: vi.fn(),
    }),
}));

vi.mock("@/components/shared/Badge", () => ({
    default: ({ title, action }: any) => (
        <div data-testid="badge">
            <span>{title}</span>
            {action}
        </div>
    ),
}));

vi.mock("@/components/shared/Button", () => ({
    default: ({ onClick, style, children, type }: any) => (
        <button
            data-testid="button"
            onClick={onClick}
            data-style={style?.join(",")}
            type={type}>
            {children}
        </button>
    ),
}));

vi.mock("lucide-react", () => ({
    Plus: () => <span data-testid="plus-icon">Plus</span>,
    Tag: () => <span data-testid="tag-icon">Tag</span>,
    X: () => <span data-testid="x-icon">X</span>,
}));

const mockTags = ["romántica", "aventura", "comida"];
const mockEmptyTags: string[] = [];

describe("TagsSection Component", () => {
    it("renders tags section", () => {
        const { container } = render(
            <TagsSection tags={mockTags} onTagsChange={vi.fn()} />
        );

        expect(container.firstChild).toBeInTheDocument();
    });

    it("renders label with correct text", () => {
        render(<TagsSection tags={mockTags} onTagsChange={vi.fn()} />);

        expect(
            screen.getByText("Tags")
        ).toBeInTheDocument();
    });

    it("renders tag icon in label", () => {
        render(<TagsSection tags={mockTags} onTagsChange={vi.fn()} />);

        expect(screen.getByTestId("tag-icon")).toBeInTheDocument();
    });

    it("renders all tags as badges", () => {
        render(<TagsSection tags={mockTags} onTagsChange={vi.fn()} />);

        const badges = screen.getAllByTestId("badge");
        expect(badges).toHaveLength(3);
    });

    it("renders tags with # prefix", () => {
        render(<TagsSection tags={mockTags} onTagsChange={vi.fn()} />);

        expect(screen.getByText("romántica")).toBeInTheDocument();
        expect(screen.getByText("aventura")).toBeInTheDocument();
        expect(screen.getByText("comida")).toBeInTheDocument();
    });

    it("renders input field with placeholder", () => {
        render(<TagsSection tags={mockTags} onTagsChange={vi.fn()} />);

        const input = screen.getByPlaceholderText(
            "romántica, aventura, comida..."
        );
        expect(input).toBeInTheDocument();
    });

    it("renders add tag button", () => {
        render(<TagsSection tags={mockTags} onTagsChange={vi.fn()} />);

        const buttons = screen.getAllByTestId("button");
        expect(buttons.length).toBeGreaterThan(0);
    });

    it("renders plus icon in add button", () => {
        render(<TagsSection tags={mockTags} onTagsChange={vi.fn()} />);

        const plusIcons = screen.getAllByTestId("plus-icon");
        expect(plusIcons.length).toBeGreaterThan(0);
    });

    it("renders remove button for each tag", () => {
        render(<TagsSection tags={mockTags} onTagsChange={vi.fn()} />);

        const xIcons = screen.getAllByTestId("x-icon");
        expect(xIcons).toHaveLength(3);
    });

    it("renders empty state when no tags", () => {
        render(<TagsSection tags={mockEmptyTags} onTagsChange={vi.fn()} />);

        const badges = screen.queryAllByTestId("badge");
        expect(badges).toHaveLength(0);
    });

    it("input has correct type", () => {
        render(<TagsSection tags={mockTags} onTagsChange={vi.fn()} />);

        const input = screen.getByPlaceholderText(
            "romántica, aventura, comida..."
        );
        expect(input).toHaveAttribute("type", "text");
    });

    it("add button has correct type", () => {
        render(<TagsSection tags={mockTags} onTagsChange={vi.fn()} />);

        const buttons = screen.getAllByTestId("button");
        buttons.forEach((button) => {
            expect(button).toHaveAttribute("type", "button");
        });
    });

    it("renders with single tag", () => {
        render(<TagsSection tags={["romántica"]} onTagsChange={vi.fn()} />);

        const badges = screen.getAllByTestId("badge");
        expect(badges).toHaveLength(1);
        expect(screen.getByText("romántica")).toBeInTheDocument();
    });

    it("renders tags container", () => {
        const { container } = render(
            <TagsSection tags={mockTags} onTagsChange={vi.fn()} />
        );

        const tagsContainer = container.querySelector(
            '[class*="tagsContainer"]'
        ) as HTMLElement;
        expect(tagsContainer).toBeInTheDocument();
        expect(tagsContainer.className).toMatch(/tagsContainer/);
    });

    it("renders add tag container", () => {
        const { container } = render(
            <TagsSection tags={mockTags} onTagsChange={vi.fn()} />
        );

        const addTagContainer = container.querySelector(
            '[class*="addTagContainer"]'
        ) as HTMLElement;
        expect(addTagContainer).toBeInTheDocument();
        expect(addTagContainer.className).toMatch(/addTagContainer/);
    });

    it("renders content wrapper", () => {
        const { container } = render(
            <TagsSection tags={mockTags} onTagsChange={vi.fn()} />
        );

        const content = container.querySelector(
            '[class*="content"]'
        ) as HTMLElement;
        expect(content).toBeInTheDocument();
        expect(content.className).toMatch(/content/);
    });
});

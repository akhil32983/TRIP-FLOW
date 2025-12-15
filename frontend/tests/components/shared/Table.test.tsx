import Table, { type Column } from "@components/shared/Table";
import { render, screen, fireEvent } from "@tests/utils/testUtils";
import { describe, it, expect, vi } from "vitest";

interface TestData {
    id: number;
    name: string;
    role: string;
}

const columns: Column<TestData>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Role", render: (item) => <strong>{item.role}</strong> }
];

const mockData: TestData[] = [
    { id: 1, name: "Alice", role: "Admin" },
    { id: 2, name: "Bob", role: "User" }
];

describe("Table Component", () => {
    it("renders headers correctly", () => {
        render(<Table data={mockData} columns={columns} />);
        
        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Role")).toBeInTheDocument();
    });

    it("renders data correctly using accessor", () => {
        render(<Table data={mockData} columns={columns} />);
        
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("renders data correctly using custom render function", () => {
        render(<Table data={mockData} columns={columns} />);
        
        const adminCell = screen.getByText("Admin");
        const userCell = screen.getByText("User");
        
        expect(adminCell.tagName).toBe("STRONG");
        expect(userCell.tagName).toBe("STRONG");
    });

    it("renders empty state message when data is empty", () => {
        render(<Table data={[]} columns={columns} />);
        
        expect(screen.getByText("No se encontraron datos")).toBeInTheDocument();
    });

    it("renders custom empty state message", () => {
        render(<Table data={[]} columns={columns} emptyMessage="Nothing here" />);
        
        expect(screen.getByText("Nothing here")).toBeInTheDocument();
    });

    it("renders loading state", () => {
        render(<Table data={[]} columns={columns} isLoading={true} />);
        
        expect(screen.getByText("Cargando...")).toBeInTheDocument();
        expect(screen.queryByText("No se encontraron datos")).not.toBeInTheDocument();
    });

    it("calls onRowClick when a row is clicked", () => {
        const mockOnRowClick = vi.fn();
        render(<Table data={mockData} columns={columns} onRowClick={mockOnRowClick} />);
        
        fireEvent.click(screen.getByText("Alice"));
        expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0]);
    });

    it("applies clickable class when onRowClick is provided", () => {
        const { container } = render(<Table data={mockData} columns={columns} onRowClick={() => {}} />);
        const rows = container.querySelectorAll("tbody tr");
        expect(rows[0]).toHaveClass(/clickableRow/); // Using regex because CSS module class names are hashed or similar
    });

    it("does not apply clickable class when onRowClick is missing", () => {
        const { container } = render(<Table data={mockData} columns={columns} />);
        const rows = container.querySelectorAll("tbody tr");
        expect(rows[0]).not.toHaveClass(/clickableRow/);
    });
});

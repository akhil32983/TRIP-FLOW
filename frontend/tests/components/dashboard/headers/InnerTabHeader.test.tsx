import InnerTabHeader from "@components/dashboard/headers/InnerTabHeader";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("InnerTabHeader Component", () => {
    const defaultProps = {
        title: "Page Title",
        back: {
            url: "/dashboard",
            label: "Dashboard",
        },
    };

    it("renders title", () => {
        render(<InnerTabHeader {...defaultProps} />);
        expect(screen.getByText("Page Title")).toBeInTheDocument();
    });

    it("renders back button", () => {
        render(<InnerTabHeader {...defaultProps} />);
        const link = screen.getByRole("link", { name: "Dashboard" });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/dashboard");
    });

    it("renders right content when provided", () => {
        render(
            <InnerTabHeader 
                {...defaultProps} 
                right={<button>Action</button>} 
            />
        );
        expect(screen.getByText("Action")).toBeInTheDocument();
    });
});

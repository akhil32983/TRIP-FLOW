import AICta from "@components/dashboard/ai/AICta";

import { render, screen } from "@tests/utils/testUtils";
import { describe, it, expect } from "vitest";

describe("AICta Component", () => {
    it("renders title", () => {
        render(<AICta />);
        expect(screen.getByText("Asistente con IA")).toBeInTheDocument();
    });

    it("renders description", () => {
        render(<AICta />);
        expect(screen.getByText(/Estás preparado para planear tu próximo viaje\?/i)).toBeInTheDocument();
    });

    it("renders 'Comenzar' button with correct link", () => {
        render(<AICta />);
        const button = screen.getByRole("link", { name: "Comenzar" });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("href", "/itineraries/new?editorType=ai");
    });
});

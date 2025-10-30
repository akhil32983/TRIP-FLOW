import type { ItineraryStatus } from "@/types/itinerary";

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const formatBudget = (budget: number) => {
    const [integerPart, decimalPart = "00"] = budget.toFixed(2).split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    if (integerPart === "0" && decimalPart === "00") return "---";
    return `${formattedInteger}, ${decimalPart} €`;
};

export const formatStatus = (status: ItineraryStatus) => {
    if (status === "DRAFT") return "Borrador";
    if (status === "PLANNED") return "Planeado";
    if (status === "ONGOING") return "En curso";
    if (status === "COMPLETED") return "Completado";
    return status;
};
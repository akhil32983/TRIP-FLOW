import { PlusIcon } from "lucide-react";

import AppLayout from "@/layouts/AppLayout";
import Button from "@/components/shared/Button";
import Searchbar from "@/components/shared/Searchbar";
import ItinerariesPreview from "@/components/dashboard/ItinerariesPreview";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function ItinerariesPage() {

    return (
        <AppLayout>
            <DashboardHeader
                title="Tus itinerarios"
                responsiveRender={<Button to="/itineraries/new" style={["tool_bordered"]}><PlusIcon size={18} /></Button>}
                defaultRender={<Button to="/itineraries/new" style={["primary"]} label="Nuevo itinerario"><PlusIcon size={18} /></Button>}
            />
            <Searchbar
                placeHolder="Buscar itinerarios..."
                onSearch={(query) => console.log("Search:", query)}
            />
            <ItinerariesPreview />
        </AppLayout>
    );
}
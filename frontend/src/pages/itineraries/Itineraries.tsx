import { useEffect, useState, useCallback } from "react";

import type { Itinerary } from "@/types/itinerary";
import type { PageData } from "@/types/shared";

import { getUserItineraries } from "@/services/itineraryService";
import { useWebSocketNotifications } from "@/hooks/notifications/useWebSocketNotifications";

import AppLayout from "@/layouts/AppLayout";
import Searchbar from "@components/shared/Searchbar";
import ItinerariesPreview from "@components/dashboard/ItinerariesPreview";
import ItinerariesHeader from "@/components/dashboard/headers/ItinerariesHeader";

const PAGE_SIZE = 10;

const getDefaultPageData = (): PageData => ({
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: PAGE_SIZE,
    isLastPage: true,
});

export default function ItinerariesPage() {
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [pageData, setPageData] = useState<PageData>(getDefaultPageData());
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchItineraries = useCallback(async (page: number, append: boolean = false) => {
        if (append) {
            setIsLoadingMore(true);
        } else {
            setIsLoading(true);
        }

        const response = await getUserItineraries({ page, size: PAGE_SIZE }, searchQuery);
        if (!response) {
            setIsLoading(false);
            setIsLoadingMore(false);
            return;
        }

        const { page: itinerariesData, ...pageMetadata } = response;
    
        setItineraries(append ? [...itineraries, ...itinerariesData] : itinerariesData);
        setPageData(pageMetadata);
        setIsLoading(false);
        setIsLoadingMore(false);
    }, [searchQuery, itineraries]);

    const loadMore = () => {
        fetchItineraries(pageData.currentPage + 1, true);
    };

    // Refresh itineraries when WebSocket notification arrives
    const handleItineraryNotification = useCallback(() => {
        fetchItineraries(0);
    }, [fetchItineraries]);

    // Listen only to itinerary-related notifications
    useWebSocketNotifications({
        types: ["ITINERARY_GENERATED"],
        onNotification: handleItineraryNotification
    });

    useEffect(() => {
        fetchItineraries(0);
    }, []);

    return (
        <AppLayout>
            <ItinerariesHeader>
                <Searchbar
                    placeHolder="Buscar itinerarios..."
                    onInputChange={setSearchQuery}
                    onSearch={() => fetchItineraries(0)}
                />
            </ItinerariesHeader>
            <ItinerariesPreview
                itineraries={itineraries}
                loadMore={loadMore}
                isLoading={isLoading}
                isLoadingMore={isLoadingMore}
                isLastPage={pageData.isLastPage}
            />
        </AppLayout>
    );
}
import { useEffect, useState } from "react";

import type { PublicUser } from "@/types/user";
import type { PageData } from "@/types/shared";

import { getUsers, deleteAccount } from "@/services/userService";
import { useNotification } from "@/providers/notificationProvider";

import { usersCache, getUsersCacheKey } from "@/cache/usersCache";

export function useUsers() {
    const [users, setUsers] = useState<PublicUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSearch, setActiveSearch] = useState("");

    const [pageData, setPageData] = useState<PageData>({
        currentPage: 0,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 5,
        isLastPage: true
    });

    const { notify } = useNotification();
    
    const fetchUsers = async (page: number = pageData.currentPage, search: string = activeSearch) => {
        const key = getUsersCacheKey(page, search);

        // Cache HIT
        const cached = usersCache.get(key);
        if (cached) {
            const { page: cachedPage, ...rest } = cached;
            setUsers(cachedPage);
            setPageData(rest);
            setIsLoading(false);
            return;
        }

        // Cache MISS
        try {
            const response = await getUsers({ page, size: pageData.itemsPerPage }, search);

            const { page: responsePage, ...rest } = response;
            setUsers(responsePage);
            setPageData(rest);

            usersCache.set(key, response);
        } catch {
            notify("Error al cargar los usuarios", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (term: string) => {
        setActiveSearch(term);
        setPageData(prev => ({ ...prev, currentPage: 0 }));
        fetchUsers(0, term);
    };

    const handlePageChange = (page: number) => {
        setPageData(prev => ({ ...prev, currentPage: page }));
        fetchUsers(page, activeSearch);
    };
    
    const removeUser = async (username: string) => {
        try {
            await deleteAccount(username);
            usersCache.clear();

            if (users.length === 1 && pageData.currentPage > 1) {
                const newPage = pageData.currentPage - 1;
                setPageData(prev => ({ ...prev, currentPage: newPage }));
                fetchUsers(newPage, activeSearch);
            } else {
                fetchUsers(pageData.currentPage, activeSearch);
            }

            notify("Usuario eliminado correctamente", "success");
            return true;
        } catch {
            notify("Error al eliminar el usuario", "error");
            return false;
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        isLoading,
        pageData,
        handleSearch,
        handlePageChange,
        removeUser
    };
}

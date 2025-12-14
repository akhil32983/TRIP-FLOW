import { useState, useEffect } from "react";

import type { PublicUser } from "@/types/user";
import type { PageData } from "@/types/shared";

import { getUsers, deleteAccount } from "@/services/userService";

import { useNotification } from "@/providers/notificationProvider";

export function useUsers() {
    const [users, setUsers] = useState<PublicUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSearch, setActiveSearch] = useState("");
    
    // Pagination data
    const [pageData, setPageData] = useState<PageData>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        isLastPage: true
    });

    const { notify } = useNotification();

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await getUsers(
                { page: pageData.currentPage - 1, size: pageData.itemsPerPage },
                activeSearch
            );

            setUsers(response.page);
            setPageData(prev => ({
                ...prev,
                totalPages: response.totalPages,
                totalItems: response.totalItems,
                currentPage: response.currentPage + 1
            }));
        } catch (error) {
            notify("Error al cargar los usuarios", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [pageData.currentPage, activeSearch]);

    const handleSearch = (term: string) => {
        setActiveSearch(term);
        setPageData(prev => ({ ...prev, currentPage: 1 }));
    };
    
    const handlePageChange = (page: number) => {
        setPageData(prev => ({ ...prev, currentPage: page }));
    };

    const removeUser = async (username: string) => {
        try {
            await deleteAccount(username);
            
            if (users.length === 1 && pageData.currentPage > 1) {
                setPageData(prev => ({ ...prev, currentPage: prev.currentPage - 1 }));
            } else {
                fetchUsers();
            }

            notify("Usuario eliminado correctamente", "success");
            return true;
        } catch (error) {
            notify("Error al eliminar el usuario", "error");
            return false;
        }
    };

    return {
        users, isLoading, pageData,
        handleSearch, handlePageChange, removeUser
    };
}

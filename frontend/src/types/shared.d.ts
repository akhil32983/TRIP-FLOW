export interface PageResponse<T> {
    page: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    isLastPage: boolean;
}

export interface PageData {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    isLastPage: boolean;
}

export interface PageRequest {
    page: number;
    size: number;
}
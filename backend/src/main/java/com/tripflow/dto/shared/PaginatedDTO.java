package com.tripflow.dto.shared;

import java.util.List;

public record PaginatedDTO<T>(
    List<T> page,
    long currentPpage,
    long totalPages,
    long totalItems,
    long itemsPerPage,
    boolean isLastPage
) {}
package com.tripflow.dto.itinerary;

import java.util.List;

public record ItineraryDTO(
    Long id,
    String title,
    String place,
    String icon,
    int people,
    double budget,
    String date,
    int countDays,
    List<String> tags,
    Long updatedCount,
    ItineraryStatusDTO status
) {}
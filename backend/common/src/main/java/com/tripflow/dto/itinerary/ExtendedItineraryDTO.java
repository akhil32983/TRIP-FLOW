package com.tripflow.dto.itinerary;

import java.util.List;

public record ExtendedItineraryDTO(
    Long id,
    String title,
    String place,
    String icon,
    int people,
    double budget,
    String date,
    List<String> tags,
    Long updatedCount,
    ItineraryStatusDTO status,
    List<ItineraryDayDTO> days,
    int countDays
) {}
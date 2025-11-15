package com.tripflow.dto.itinerary;

import java.util.List;

import com.tripflow.model.types.ItineraryStatus;

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
    ItineraryStatus status
) {}
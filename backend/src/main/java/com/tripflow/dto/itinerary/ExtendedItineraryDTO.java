package com.tripflow.dto.itinerary;

import java.util.List;

import com.tripflow.model.types.ItineraryStatus;

public record ExtendedItineraryDTO(
    Long id,
    String title,
    String place,
    int people,
    double budget,
    String date,
    List<String> tags,
    Long updatedCount,
    ItineraryStatus status,
    List<ItineraryDayDTO> days
) {}
package com.tripflow.dto.itinerary;

import java.util.List;

import com.tripflow.model.types.ItineraryStatus;

public record ItineraryDTO(
    Long id,
    String place,
    Long updatedCount,
    ItineraryStatus status,
    List<ItineraryDayDTO> days
) {}
package com.tripflow.dto.itinerary;

import java.util.List;

public record ItineraryDayDTO(
    int day,
    List<ActivityDTO> activities
) {}
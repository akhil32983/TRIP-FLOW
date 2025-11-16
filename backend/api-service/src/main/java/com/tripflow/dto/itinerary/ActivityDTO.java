package com.tripflow.dto.itinerary;

public record ActivityDTO(
    String activity,
    String details,
    LocationDTO location,
    String time,
    String duration
) {}
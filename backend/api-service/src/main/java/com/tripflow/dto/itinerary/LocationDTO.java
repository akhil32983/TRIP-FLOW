package com.tripflow.dto.itinerary;

public record LocationDTO(
    String name,
    String address,
    CoordinatesDTO coordinates
) {}
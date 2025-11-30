package com.tripflow.dto.itinerary;

import java.util.List;

import com.tripflow.dto.externalImage.ExternalImageDTO;

public record ExtendedItineraryDTO(
    Long id,
    String title,
    String place,
    int people,
    double budget,
    String date,
    List<String> tags,
    Long updatedCount,
    ItineraryStatusDTO status,
    List<ItineraryDayDTO> days,
    int countDays,
    ExternalImageDTO coverImage
) {}
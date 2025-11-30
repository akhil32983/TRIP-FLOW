package com.tripflow.dto.externalImage;

public record ExternalImageDTO(
    String imageUrl,
    String altDescription,
    String authorUsername
) {}
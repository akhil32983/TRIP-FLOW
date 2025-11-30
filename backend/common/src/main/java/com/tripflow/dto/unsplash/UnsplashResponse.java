package com.tripflow.dto.unsplash;

public record UnsplashResponse(
    String altDescription,
    String url,
    String user
) {}
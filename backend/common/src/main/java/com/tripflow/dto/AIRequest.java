package com.tripflow.dto;

import java.util.List;

public record AIRequest(
    String destination,
    String style,
    Double budget,
    String lodging,
    String duration,
    List<String> interests
) {}
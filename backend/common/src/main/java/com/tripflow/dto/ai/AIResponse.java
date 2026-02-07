package com.tripflow.dto.ai;

public record AIResponse(
    String message,
    AIUsageDTO aiUsage
) {}
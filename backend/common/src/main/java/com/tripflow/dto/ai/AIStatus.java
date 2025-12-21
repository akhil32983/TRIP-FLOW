package com.tripflow.dto.ai;

public record AIStatus(
    boolean isProcessing,
    boolean canUseAI,
    int dailyLimit,
    int remainingRequests
) {}
package com.tripflow.dto.ai;

import java.time.LocalDate;

public record AIUsageDTO(
    long usedQuota,
    long remainingQuota,
    long limit,
    LocalDate resetDate
) {}
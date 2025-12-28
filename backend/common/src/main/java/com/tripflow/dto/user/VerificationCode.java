package com.tripflow.dto.user;

import java.time.Instant;

public record VerificationCode(
    String code,
    Instant expiresAt
) {}

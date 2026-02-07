package com.tripflow.dto.auth;

public record VerifyAccountRequest(
    String username,
    String code
) {}

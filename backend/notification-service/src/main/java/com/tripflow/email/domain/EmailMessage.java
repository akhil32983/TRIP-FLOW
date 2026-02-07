package com.tripflow.email.domain;

public record EmailMessage(
    String to,
    String subject,
    String body
) {}

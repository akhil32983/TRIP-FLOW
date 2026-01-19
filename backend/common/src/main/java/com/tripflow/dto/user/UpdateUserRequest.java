package com.tripflow.dto.user;

public record UpdateUserRequest(
    String name,
    String description,
    String location,
    Boolean notificationsAllowed
) {}
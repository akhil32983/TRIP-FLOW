package com.tripflow.dto.user;

import java.time.LocalDateTime;

import com.tripflow.model.types.PlanType;
import com.tripflow.model.types.UserType;

public record PublicUserDTO(
    String username,
    String name,
    String description,
    String location,
    Boolean notificationsAllowed,
    LocalDateTime createdAt,
    UserType role,
    PlanType plan
) {}
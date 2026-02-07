package com.tripflow.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.tripflow.dto.ai.AIUsageDTO;
import com.tripflow.model.AIUsage;

@Mapper(componentModel = "spring")
public interface AIMapper {

    @Mapping(source = "aiUsage.usage", target = "usedQuota")
    @Mapping(source = "aiUsage.user.plan.dailyLimit", target = "limit")
    @Mapping(target = "remainingQuota", expression = "java(aiUsage.getUser().getPlan().getDailyLimit() - aiUsage.getUsage())")
    @Mapping(target = "resetDate", expression = "java(aiUsage.getDate().plusDays(1))")
    AIUsageDTO toDTO(AIUsage aiUsage);
}

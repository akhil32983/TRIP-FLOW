package com.tripflow.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.tripflow.kafka.messages.NotificationMessage;
import com.tripflow.model.Notification;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    @Mapping(target = "id", ignore = true)
    Notification toNotification(NotificationMessage notificationMessage);
}

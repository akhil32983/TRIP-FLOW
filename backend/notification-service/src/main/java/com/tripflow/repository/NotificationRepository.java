package com.tripflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tripflow.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}

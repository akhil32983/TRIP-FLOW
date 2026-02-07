package com.tripflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tripflow.model.AILog;

public interface AILogRepository extends JpaRepository<AILog, Long> {
    
}
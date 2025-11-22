package com.tripflow.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tripflow.model.AIUsage;
import com.tripflow.model.User;

public interface AIUsageRepository extends JpaRepository<AIUsage, Long> {
    Optional<AIUsage> findByUserAndDate(User user, LocalDate date);
}

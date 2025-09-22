package com.tripflow.repository.itinerary;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tripflow.model.itinerary.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    
}
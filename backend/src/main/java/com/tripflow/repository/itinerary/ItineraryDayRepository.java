package com.tripflow.repository.itinerary;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tripflow.model.itinerary.ItineraryDay;

public interface ItineraryDayRepository extends JpaRepository<ItineraryDay, Long> {
    
}
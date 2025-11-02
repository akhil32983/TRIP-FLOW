package com.tripflow.repository.itinerary;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tripflow.model.itinerary.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
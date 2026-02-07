package com.tripflow.repository.itinerary;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tripflow.model.itinerary.GeographicPoint;

public interface GeographicPointRepository extends JpaRepository<GeographicPoint, Long> {
    Optional<GeographicPoint> findByLatitudeAndLongitude(Double latitude, Double longitude);
}
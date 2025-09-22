package com.tripflow.repository.itinerary;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tripflow.model.itinerary.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByLatitudeAndLongitude(double latitude, double longitude);
}
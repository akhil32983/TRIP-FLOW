package com.tripflow.repository.itinerary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tripflow.model.itinerary.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    @Query(
        "SELECT COUNT(a) FROM Activity a " +
        "JOIN a.itineraryDay id " +
        "JOIN id.itinerary i " +
        "WHERE i.user.id = :userId"
    )
    Long countByUserId(@Param("userId") Long userId);
}
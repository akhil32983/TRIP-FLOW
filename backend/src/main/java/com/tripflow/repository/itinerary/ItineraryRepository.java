package com.tripflow.repository.itinerary;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tripflow.model.User;
import com.tripflow.model.itinerary.Itinerary;


@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {
    Page<Itinerary> findAllByUser(User user, Pageable pageable);
    long countByUser(User user);
}
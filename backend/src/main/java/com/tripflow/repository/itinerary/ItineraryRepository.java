package com.tripflow.repository.itinerary;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tripflow.model.User;
import com.tripflow.model.itinerary.Itinerary;


@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {
    Page<Itinerary> findAllByUserOrderByUpdatedAtDesc(User user, Pageable pageable);
    Long countByUser(User user);

    @Query("SELECT COUNT(id) FROM ItineraryDay id JOIN id.itinerary i WHERE i.user.id = :userId")
    Long countTotalDaysByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(DISTINCT i.place) FROM Itinerary i WHERE i.user.id = :userId")
    Long countDistinctLocationsByUserId(@Param("userId") Long userId);
}
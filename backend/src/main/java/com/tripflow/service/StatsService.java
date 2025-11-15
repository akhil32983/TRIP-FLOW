package com.tripflow.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.tripflow.dto.stats.StatDTO;
import com.tripflow.dto.stats.UserStatsDTO;
import com.tripflow.model.User;
import com.tripflow.service.itinerary.ActivityService;
import com.tripflow.service.itinerary.ItineraryService;

@Service
public class StatsService {
    private final UserService userService;
    private final ItineraryService itineraryService;
    private final ActivityService activityService;

    public StatsService(UserService userService, ItineraryService itineraryService, ActivityService activityService) {
        this.userService = userService;
        this.itineraryService = itineraryService;
        this.activityService = activityService;
    }

    /**
     * Retrieves statistics for the authenticated user.
     *
     * @return UserStatsDTO containing various user statistics
     */
    public UserStatsDTO getUserStats() {
        User user = userService.getAuthenticatedUser();

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        Long userId = user.getId();

        Long activities = this.activityService.countActivitiesByUserId(userId);
        Long placesVisited = this.itineraryService.countDistinctLocationsByUserId(userId);
        Long totalDays = this.itineraryService.countTotalDaysByUserId(userId);

        return new UserStatsDTO(List.of(
            new StatDTO("activities", activities),
            new StatDTO("places_visited", placesVisited),
            new StatDTO("total_days", totalDays)
        ));
    }
}
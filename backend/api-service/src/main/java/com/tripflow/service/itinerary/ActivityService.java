package com.tripflow.service.itinerary;

import org.springframework.stereotype.Service;

import com.tripflow.dto.itinerary.ActivityDTO;
import com.tripflow.mappers.ItineraryMapper;
import com.tripflow.model.itinerary.Activity;
import com.tripflow.model.itinerary.Location;
import com.tripflow.repository.itinerary.ActivityRepository;

@Service
public class ActivityService {
    private final ActivityRepository activityRepository;
    private final LocationService locationService;
    private final ItineraryMapper itineraryMapper;

    public ActivityService(
        ActivityRepository activityRepository,
        LocationService locationService,
        ItineraryMapper itineraryMapper
    ) {
        this.activityRepository = activityRepository;
        this.locationService = locationService;
        this.itineraryMapper = itineraryMapper;
    }
    
    /**
     * Creates a new Activity entity from the provided ActivityDTO.
     *
     * @param activityDTO the DTO containing activity data
     * @return the created Activity entity
     */
    public Activity createActivityEntity(ActivityDTO activityDTO) {
        Activity activity = this.itineraryMapper.toActivity(activityDTO);

        // Create location and link to activity
        Location location = this.locationService.createLocationEntity(
            activityDTO.location()
        );

        activity.setLocation(location);
        return activity;
    }

    /**
     * Counts the number of completed activities for a given user ID.
     *
     * @param userId the ID of the user
     * @return the count of completed activities
     */
    public Long countActivitiesByUserId(Long userId) {
        return this.activityRepository.countByUserId(userId);
    }
}

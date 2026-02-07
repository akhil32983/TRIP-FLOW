package com.tripflow.unit;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.mockito.Answers;

import com.tripflow.dto.itinerary.ActivityDTO;
import com.tripflow.dto.itinerary.LocationDTO;
import com.tripflow.mappers.ItineraryMapper;
import com.tripflow.dto.itinerary.CoordinatesDTO;
import com.tripflow.model.itinerary.Activity;
import com.tripflow.model.itinerary.GeographicPoint;
import com.tripflow.model.itinerary.Location;
import com.tripflow.repository.itinerary.ActivityRepository;
import com.tripflow.service.itinerary.ActivityService;
import com.tripflow.service.itinerary.LocationService;

@Tag("unit")
public class ActivityServiceTest {
    private ActivityRepository activityRepository;
    private LocationService locationService;
    private ItineraryMapper itineraryMapper;
    private ActivityService activityService;

    @BeforeEach
    public void setUp() {
        this.activityRepository = mock(ActivityRepository.class);
        this.locationService = mock(LocationService.class);
        this.itineraryMapper = mock(ItineraryMapper.class);

        this.activityService = new ActivityService(
            activityRepository, locationService, itineraryMapper
        );
    }

    @Test
    @DisplayName("ActivityService should create activity with location and establish bidirectional relationship")
    public void testCreateActivityEntityWithLocation() {
        CoordinatesDTO coordinates = mock(CoordinatesDTO.class);
        when(coordinates.latitude()).thenReturn(48.8566);
        when(coordinates.longitude()).thenReturn(2.3522);

        LocationDTO locationDTO = mock(LocationDTO.class);
        when(locationDTO.coordinates()).thenReturn(coordinates);

        ActivityDTO activityDTO = mock(ActivityDTO.class);
        when(activityDTO.location()).thenReturn(locationDTO);

        Activity activity = mock(Activity.class);
        when(itineraryMapper.toActivity(activityDTO)).thenReturn(activity);

        Location location = mock(Location.class);
        when(locationService.createLocationEntity(locationDTO)).thenReturn(location);

        Activity result = activityService.createActivityEntity(activityDTO);

        assertEquals(activity, result);
        verify(locationService).createLocationEntity(locationDTO);
        verify(activity).setLocation(location);
    }

    @Test
    @DisplayName("ActivityService should handle edge case coordinates")
    public void testCreateActivityEntityWithEdgeCaseCoordinates() {
        CoordinatesDTO coordinates = mock(CoordinatesDTO.class);
        when(coordinates.latitude()).thenReturn(90.0);   // North Pole
        when(coordinates.longitude()).thenReturn(180.0); // Date line

        LocationDTO locationDTO = mock(LocationDTO.class);
        when(locationDTO.coordinates()).thenReturn(coordinates);

        ActivityDTO activityDTO = mock(ActivityDTO.class);
        when(activityDTO.location()).thenReturn(locationDTO);

        Activity activity = mock(Activity.class);
        when(itineraryMapper.toActivity(activityDTO)).thenReturn(activity);

        Location location = mock(Location.class);
        when(locationService.createLocationEntity(locationDTO)).thenReturn(location);

        Activity result = activityService.createActivityEntity(activityDTO);

        assertEquals(activity, result);
        verify(locationService).createLocationEntity(locationDTO);
        verify(activity).setLocation(location);
    }

    @Test
    @DisplayName("ActivityService should handle null location DTO")
    public void testCreateActivityEntityWithNullLocation() {
        ActivityDTO activityDTO = mock(ActivityDTO.class);
        when(activityDTO.location()).thenReturn(null);

        Activity activity = mock(Activity.class, Answers.CALLS_REAL_METHODS);
        when(itineraryMapper.toActivity(activityDTO)).thenReturn(activity);

        Location defaultLocation = mock(Location.class, Answers.CALLS_REAL_METHODS);
        GeographicPoint defaultPoint = mock(GeographicPoint.class);
        when(defaultPoint.getLatitude()).thenReturn(0.0);
        when(defaultPoint.getLongitude()).thenReturn(0.0);
        when(defaultLocation.getCoordinates()).thenReturn(defaultPoint);
        when(locationService.createLocationEntity(null)).thenReturn(defaultLocation);

        Activity result = activityService.createActivityEntity(activityDTO);

        assertEquals(activity, result);
        assertNotNull(result.getLocation());
        assertEquals(result.getLocation().getCoordinates().getLatitude(), 0.0);
        assertEquals(result.getLocation().getCoordinates().getLongitude(), 0.0);
    }

    @Test
    @DisplayName("ActivityService should use mapper to convert DTO to entity")
    public void testCreateActivityEntityUsesMapper() {
        CoordinatesDTO coordinates = mock(CoordinatesDTO.class);
        when(coordinates.latitude()).thenReturn(40.7128);
        when(coordinates.longitude()).thenReturn(-74.0060);

        LocationDTO locationDTO = mock(LocationDTO.class);
        when(locationDTO.coordinates()).thenReturn(coordinates);

        ActivityDTO activityDTO = mock(ActivityDTO.class);
        when(activityDTO.location()).thenReturn(locationDTO);

        Activity activity = mock(Activity.class);
        when(itineraryMapper.toActivity(activityDTO)).thenReturn(activity);

        Location location = mock(Location.class);
        when(locationService.createLocationEntity(locationDTO)).thenReturn(location);

        Activity result = activityService.createActivityEntity(activityDTO);

        verify(itineraryMapper).toActivity(activityDTO);
        assertEquals(activity, result);
    }

    @Test
    @DisplayName("ActivityService should count activities by user ID")
    public void testCountActivitiesByUserId() {
        Long userId = 1L;
        Long expectedCount = 5L;
        when(activityRepository.countByUserId(userId)).thenReturn(expectedCount);

        Long result = activityService.countActivitiesByUserId(userId);

        assertEquals(expectedCount, result);
        verify(activityRepository).countByUserId(userId);
    }

    @Test
    @DisplayName("ActivityService should create activity even with default coordinates (0,0)")
    public void testCreateActivityEntityWithDefaultCoordinates() {
        CoordinatesDTO coordinates = mock(CoordinatesDTO.class);
        when(coordinates.latitude()).thenReturn(0.0);
        when(coordinates.longitude()).thenReturn(0.0);

        LocationDTO locationDTO = mock(LocationDTO.class);
        when(locationDTO.coordinates()).thenReturn(coordinates);

        ActivityDTO activityDTO = mock(ActivityDTO.class);
        when(activityDTO.location()).thenReturn(locationDTO);

        Activity activity = mock(Activity.class);
        when(itineraryMapper.toActivity(activityDTO)).thenReturn(activity);

        Location location = mock(Location.class);
        when(locationService.createLocationEntity(locationDTO)).thenReturn(location);

        Activity result = activityService.createActivityEntity(activityDTO);

        assertEquals(activity, result);
        verify(locationService).createLocationEntity(locationDTO);
        verify(activity).setLocation(location);
    }
}
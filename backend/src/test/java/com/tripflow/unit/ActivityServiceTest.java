package com.tripflow.unit;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.tripflow.dto.itinerary.ActivityDTO;
import com.tripflow.dto.itinerary.ItineraryMapper;
import com.tripflow.dto.itinerary.LocationDTO;
import com.tripflow.dto.itinerary.CoordinatesDTO;
import com.tripflow.model.itinerary.Activity;
import com.tripflow.model.itinerary.Location;
import com.tripflow.service.itinerary.ActivityService;
import com.tripflow.service.itinerary.LocationService;

@Tag("unit")
public class ActivityServiceTest {
    private LocationService locationService;
    private ItineraryMapper itineraryMapper;
    private ActivityService activityService;

    @BeforeEach
    public void setUp() {
        this.locationService = mock(LocationService.class);
        this.itineraryMapper = mock(ItineraryMapper.class);

        this.activityService = new ActivityService(
            locationService, itineraryMapper
        );
    }

    @Test
    @DisplayName("ActivityService should create activity with new location")
    public void testCreateActivityEntityWithNewLocation() {
        CoordinatesDTO coordinates = mock(CoordinatesDTO.class);
        when(coordinates.latitude()).thenReturn(48.8566);
        when(coordinates.longitude()).thenReturn(2.3522);

        LocationDTO locationDTO = mock(LocationDTO.class);
        when(locationDTO.coordinates()).thenReturn(coordinates);

        ActivityDTO activityDTO = mock(ActivityDTO.class);
        when(activityDTO.location()).thenReturn(locationDTO);

        Activity activity = mock(Activity.class);
        when(itineraryMapper.toActivity(activityDTO)).thenReturn(activity);

        when(locationService.findEntityByLatAndLon(48.8566, 2.3522)).thenReturn(null);

        Location newLocation = mock(Location.class);
        when(locationService.createLocationEntity(locationDTO, activity)).thenReturn(newLocation);

        Activity result = activityService.createActivityEntity(activityDTO);

        assertEquals(activity, result);
        verify(locationService).findEntityByLatAndLon(48.8566, 2.3522);
        verify(locationService).createLocationEntity(locationDTO, activity);
        verify(newLocation, never()).addActivity(any());
    }

    @Test
    @DisplayName("ActivityService should create activity with existing location")
    public void testCreateActivityEntityWithExistingLocation() {
        CoordinatesDTO coordinates = mock(CoordinatesDTO.class);
        when(coordinates.latitude()).thenReturn(48.8566);
        when(coordinates.longitude()).thenReturn(2.3522);

        LocationDTO locationDTO = mock(LocationDTO.class);
        when(locationDTO.coordinates()).thenReturn(coordinates);

        ActivityDTO activityDTO = mock(ActivityDTO.class);
        when(activityDTO.location()).thenReturn(locationDTO);

        Activity activity = mock(Activity.class);
        when(itineraryMapper.toActivity(activityDTO)).thenReturn(activity);

        Location existingLocation = mock(Location.class);
        when(locationService.findEntityByLatAndLon(48.8566, 2.3522)).thenReturn(existingLocation);

        doNothing().when(existingLocation).addActivity(activity);

        Activity result = activityService.createActivityEntity(activityDTO);

        assertEquals(activity, result);
        verify(locationService).findEntityByLatAndLon(48.8566, 2.3522);
        verify(existingLocation).addActivity(activity);
        verify(locationService, never()).createLocationEntity(any(), any());
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

        when(locationService.findEntityByLatAndLon(90.0, 180.0)).thenReturn(null);

        Location newLocation = mock(Location.class);
        when(locationService.createLocationEntity(locationDTO, activity)).thenReturn(newLocation);

        Activity result = activityService.createActivityEntity(activityDTO);

        assertEquals(activity, result);
        verify(locationService).findEntityByLatAndLon(90.0, 180.0);
        verify(locationService).createLocationEntity(locationDTO, activity);
    }

    @Test
    @DisplayName("ActivityService should handle null location DTO")
    public void testCreateActivityEntityWithNullLocation() {
        ActivityDTO activityDTO = mock(ActivityDTO.class);
        when(activityDTO.location()).thenReturn(null);

        Activity activity = mock(Activity.class);
        when(itineraryMapper.toActivity(activityDTO)).thenReturn(activity);

        assertThrows(NullPointerException.class, () -> {
            activityService.createActivityEntity(activityDTO);
        });
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

        when(locationService.findEntityByLatAndLon(40.7128, -74.0060)).thenReturn(null);

        Location location = mock(Location.class);
        when(locationService.createLocationEntity(locationDTO, activity)).thenReturn(location);

        Activity result = activityService.createActivityEntity(activityDTO);

        verify(itineraryMapper).toActivity(activityDTO);
        assertEquals(activity, result);
    }
}
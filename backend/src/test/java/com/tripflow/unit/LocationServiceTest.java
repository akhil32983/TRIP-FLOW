package com.tripflow.unit;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.tripflow.dto.itinerary.ItineraryMapper;
import com.tripflow.dto.itinerary.LocationDTO;
import com.tripflow.model.itinerary.Activity;
import com.tripflow.model.itinerary.Location;
import com.tripflow.repository.itinerary.LocationRepository;
import com.tripflow.service.itinerary.LocationService;

@Tag("unit")
public class LocationServiceTest {
    private LocationRepository locationRepository;
    private ItineraryMapper itineraryMapper;
    private LocationService locationService;

    @BeforeEach
    public void setUp() {
        this.locationRepository = mock(LocationRepository.class);
        this.itineraryMapper = mock(ItineraryMapper.class);

        this.locationService = new LocationService(
            locationRepository, itineraryMapper
        );
    }

    @Test
    @DisplayName("LocationService should find existing location by coordinates")
    public void testFindEntityByLatAndLonExists() {
        double latitude = 48.8566;
        double longitude = 2.3522;
        Location expectedLocation = mock(Location.class);

        when(locationRepository.findByLatitudeAndLongitude(latitude, longitude))
            .thenReturn(Optional.of(expectedLocation));

        Location result = locationService.findEntityByLatAndLon(latitude, longitude);

        assertEquals(expectedLocation, result);
        verify(locationRepository).findByLatitudeAndLongitude(latitude, longitude);
    }

    @Test
    @DisplayName("LocationService should return null when location not found")
    public void testFindEntityByLatAndLonNotFound() {
        double latitude = 40.7128;
        double longitude = -74.0060;

        when(locationRepository.findByLatitudeAndLongitude(latitude, longitude))
            .thenReturn(Optional.empty());

        Location result = locationService.findEntityByLatAndLon(latitude, longitude);

        assertNull(result);
        verify(locationRepository).findByLatitudeAndLongitude(latitude, longitude);
    }

    @Test
    @DisplayName("LocationService should handle edge case coordinates")
    public void testFindEntityByLatAndLonWithEdgeCaseCoordinates() {
        double latitude = 90.0;
        double longitude = 180.0;
        Location expectedLocation = mock(Location.class);

        when(locationRepository.findByLatitudeAndLongitude(latitude, longitude))
            .thenReturn(Optional.of(expectedLocation));

        Location result = locationService.findEntityByLatAndLon(latitude, longitude);

        assertEquals(expectedLocation, result);
        verify(locationRepository).findByLatitudeAndLongitude(latitude, longitude);
    }

    @Test
    @DisplayName("LocationService should create new location with activity")
    public void testCreateLocationEntity() {
        LocationDTO locationDTO = mock(LocationDTO.class);
        Activity activity = mock(Activity.class);

        Location mappedLocation = mock(Location.class);
        when(itineraryMapper.toLocation(locationDTO)).thenReturn(mappedLocation);

        Location savedLocation = mock(Location.class);
        when(locationRepository.save(mappedLocation)).thenReturn(savedLocation);

        doNothing().when(mappedLocation).addActivity(activity);

        Location result = locationService.createLocationEntity(locationDTO, activity);

        assertEquals(savedLocation, result);
        verify(itineraryMapper).toLocation(locationDTO);
        verify(mappedLocation).addActivity(activity);
        verify(locationRepository).save(mappedLocation);
    }

    @Test
    @DisplayName("LocationService should use mapper to convert DTO to entity")
    public void testCreateLocationEntityUsesMapper() {
        LocationDTO locationDTO = mock(LocationDTO.class);
        Activity activity = mock(Activity.class);

        Location mappedLocation = mock(Location.class);
        when(itineraryMapper.toLocation(locationDTO)).thenReturn(mappedLocation);

        Location savedLocation = mock(Location.class);
        when(locationRepository.save(mappedLocation)).thenReturn(savedLocation);

        Location result = locationService.createLocationEntity(locationDTO, activity);

        verify(itineraryMapper).toLocation(locationDTO);
        assertEquals(savedLocation, result);
    }

    @Test
    @DisplayName("LocationService should add activity to location before saving")
    public void testCreateLocationEntityAddsActivity() {
        LocationDTO locationDTO = mock(LocationDTO.class);
        Activity activity = mock(Activity.class);

        Location mappedLocation = mock(Location.class);
        when(itineraryMapper.toLocation(locationDTO)).thenReturn(mappedLocation);

        Location savedLocation = mock(Location.class);
        when(locationRepository.save(mappedLocation)).thenReturn(savedLocation);

        doNothing().when(mappedLocation).addActivity(activity);

        locationService.createLocationEntity(locationDTO, activity);

        verify(mappedLocation).addActivity(activity);
    }

    @Test
    @DisplayName("LocationService should save location after mapping and adding activity")
    public void testCreateLocationEntitySavesLocation() {
        LocationDTO locationDTO = mock(LocationDTO.class);
        Activity activity = mock(Activity.class);

        Location mappedLocation = mock(Location.class);
        when(itineraryMapper.toLocation(locationDTO)).thenReturn(mappedLocation);

        Location savedLocation = mock(Location.class);
        when(locationRepository.save(mappedLocation)).thenReturn(savedLocation);

        locationService.createLocationEntity(locationDTO, activity);

        verify(locationRepository).save(mappedLocation);
    }

    @Test
    @DisplayName("LocationService should handle zero coordinates")
    public void testFindEntityByLatAndLonWithZeroCoordinates() {
        double latitude = 0.0;
        double longitude = 0.0;
        Location expectedLocation = mock(Location.class);

        when(locationRepository.findByLatitudeAndLongitude(latitude, longitude))
            .thenReturn(Optional.of(expectedLocation));

        Location result = locationService.findEntityByLatAndLon(latitude, longitude);

        assertEquals(expectedLocation, result);
        verify(locationRepository).findByLatitudeAndLongitude(latitude, longitude);
    }
}
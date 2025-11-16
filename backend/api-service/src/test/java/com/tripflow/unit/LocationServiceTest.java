package com.tripflow.unit;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.tripflow.dto.itinerary.CoordinatesDTO;
import com.tripflow.dto.itinerary.ItineraryMapper;
import com.tripflow.dto.itinerary.LocationDTO;
import com.tripflow.model.itinerary.GeographicPoint;
import com.tripflow.model.itinerary.Location;
import com.tripflow.service.itinerary.GeographicPointService;
import com.tripflow.service.itinerary.LocationService;

@Tag("unit")
public class LocationServiceTest {
    private GeographicPointService geographicPointService;
    private ItineraryMapper itineraryMapper;
    private LocationService locationService;

    @BeforeEach
    public void setUp() {
        this.geographicPointService = mock(GeographicPointService.class);
        this.itineraryMapper = mock(ItineraryMapper.class);

        this.locationService = new LocationService(
            geographicPointService, itineraryMapper
        );
    }

    @Test
    @DisplayName("LocationService should create location with valid coordinates")
    public void testCreateLocationEntityWithValidCoordinates() {
        double latitude = 48.8566;
        double longitude = 2.3522;

        CoordinatesDTO coordinatesDTO = mock(CoordinatesDTO.class);
        when(coordinatesDTO.latitude()).thenReturn(latitude);
        when(coordinatesDTO.longitude()).thenReturn(longitude);

        LocationDTO locationDTO = mock(LocationDTO.class);
        when(locationDTO.coordinates()).thenReturn(coordinatesDTO);
        when(locationDTO.name()).thenReturn("Tour Eiffel");
        when(locationDTO.address()).thenReturn("Champ de Mars, Paris");

        Location mappedLocation = mock(Location.class);
        when(itineraryMapper.toLocation(locationDTO)).thenReturn(mappedLocation);

        GeographicPoint geographicPoint = mock(GeographicPoint.class);
        when(geographicPointService.findOrCreateByCoordinates(latitude, longitude))
            .thenReturn(geographicPoint);

        Location result = locationService.createLocationEntity(locationDTO);

        assertNotNull(result);
        assertEquals(mappedLocation, result);
        verify(itineraryMapper).toLocation(locationDTO);
        verify(geographicPointService).findOrCreateByCoordinates(latitude, longitude);
        verify(mappedLocation).setCoordinates(geographicPoint);
    }

    @Test
    @DisplayName("LocationService should use default point when coordinates are null")
    public void testCreateLocationEntityWithNullCoordinates() {
        LocationDTO locationDTO = mock(LocationDTO.class);
        when(locationDTO.coordinates()).thenReturn(null);

        Location mappedLocation = mock(Location.class);
        when(itineraryMapper.toLocation(locationDTO)).thenReturn(mappedLocation);

        GeographicPoint defaultPoint = mock(GeographicPoint.class);
        when(geographicPointService.getDefaultPoint()).thenReturn(defaultPoint);

        Location result = locationService.createLocationEntity(locationDTO);

        assertNotNull(result);
        verify(geographicPointService).getDefaultPoint();
        verify(geographicPointService, never()).findOrCreateByCoordinates(anyDouble(), anyDouble());
        verify(mappedLocation).setCoordinates(defaultPoint);
    }

    @Test
    @DisplayName("LocationService should use default point when latitude is null")
    public void testCreateLocationEntityWithNullLatitude() {
        CoordinatesDTO coordinatesDTO = mock(CoordinatesDTO.class);
        when(coordinatesDTO.latitude()).thenReturn(null);
        when(coordinatesDTO.longitude()).thenReturn(2.3522);

        LocationDTO locationDTO = mock(LocationDTO.class);
        when(locationDTO.coordinates()).thenReturn(coordinatesDTO);

        Location mappedLocation = mock(Location.class);
        when(itineraryMapper.toLocation(locationDTO)).thenReturn(mappedLocation);

        GeographicPoint defaultPoint = mock(GeographicPoint.class);
        when(geographicPointService.getDefaultPoint()).thenReturn(defaultPoint);

        Location result = locationService.createLocationEntity(locationDTO);

        assertNotNull(result);
        verify(geographicPointService).getDefaultPoint();
        verify(geographicPointService, never()).findOrCreateByCoordinates(anyDouble(), anyDouble());
        verify(mappedLocation).setCoordinates(defaultPoint);
    }

    @Test
    @DisplayName("LocationService should use default point when longitude is null")
    public void testCreateLocationEntityWithNullLongitude() {
        CoordinatesDTO coordinatesDTO = mock(CoordinatesDTO.class);
        when(coordinatesDTO.latitude()).thenReturn(48.8566);
        when(coordinatesDTO.longitude()).thenReturn(null);

        LocationDTO locationDTO = mock(LocationDTO.class);
        when(locationDTO.coordinates()).thenReturn(coordinatesDTO);

        Location mappedLocation = mock(Location.class);
        when(itineraryMapper.toLocation(locationDTO)).thenReturn(mappedLocation);

        GeographicPoint defaultPoint = mock(GeographicPoint.class);
        when(geographicPointService.getDefaultPoint()).thenReturn(defaultPoint);

        Location result = locationService.createLocationEntity(locationDTO);

        assertNotNull(result);
        verify(geographicPointService).getDefaultPoint();
        verify(mappedLocation).setCoordinates(defaultPoint);
    }

    @Test
    @DisplayName("LocationService should handle edge case coordinates")
    public void testCreateLocationEntityWithEdgeCaseCoordinates() {
        double latitude = 90.0;   // North Pole
        double longitude = 180.0; // Date line

        CoordinatesDTO coordinatesDTO = mock(CoordinatesDTO.class);
        when(coordinatesDTO.latitude()).thenReturn(latitude);
        when(coordinatesDTO.longitude()).thenReturn(longitude);

        LocationDTO locationDTO = mock(LocationDTO.class);
        when(locationDTO.coordinates()).thenReturn(coordinatesDTO);

        Location mappedLocation = mock(Location.class);
        when(itineraryMapper.toLocation(locationDTO)).thenReturn(mappedLocation);

        GeographicPoint geographicPoint = mock(GeographicPoint.class);
        when(geographicPointService.findOrCreateByCoordinates(latitude, longitude))
            .thenReturn(geographicPoint);

        Location result = locationService.createLocationEntity(locationDTO);

        assertNotNull(result);
        verify(geographicPointService).findOrCreateByCoordinates(latitude, longitude);
        verify(mappedLocation).setCoordinates(geographicPoint);
    }

    @Test
    @DisplayName("LocationService should handle zero coordinates")
    public void testCreateLocationEntityWithZeroCoordinates() {
        double latitude = 0.0;
        double longitude = 0.0;

        CoordinatesDTO coordinatesDTO = mock(CoordinatesDTO.class);
        when(coordinatesDTO.latitude()).thenReturn(latitude);
        when(coordinatesDTO.longitude()).thenReturn(longitude);

        LocationDTO locationDTO = mock(LocationDTO.class);
        when(locationDTO.coordinates()).thenReturn(coordinatesDTO);

        Location mappedLocation = mock(Location.class);
        when(itineraryMapper.toLocation(locationDTO)).thenReturn(mappedLocation);

        GeographicPoint geographicPoint = mock(GeographicPoint.class);
        when(geographicPointService.findOrCreateByCoordinates(latitude, longitude))
            .thenReturn(geographicPoint);

        Location result = locationService.createLocationEntity(locationDTO);

        assertNotNull(result);
        verify(geographicPointService).findOrCreateByCoordinates(latitude, longitude);
        verify(mappedLocation).setCoordinates(geographicPoint);
    }

    @Test
    @DisplayName("LocationService should use mapper to convert DTO to entity")
    public void testCreateLocationEntityUsesMapper() {
        CoordinatesDTO coordinatesDTO = mock(CoordinatesDTO.class);
        when(coordinatesDTO.latitude()).thenReturn(40.7128);
        when(coordinatesDTO.longitude()).thenReturn(-74.0060);

        LocationDTO locationDTO = mock(LocationDTO.class);
        when(locationDTO.coordinates()).thenReturn(coordinatesDTO);

        Location mappedLocation = mock(Location.class);
        when(itineraryMapper.toLocation(locationDTO)).thenReturn(mappedLocation);

        GeographicPoint geographicPoint = mock(GeographicPoint.class);
        when(geographicPointService.findOrCreateByCoordinates(anyDouble(), anyDouble()))
            .thenReturn(geographicPoint);

        locationService.createLocationEntity(locationDTO);

        verify(itineraryMapper).toLocation(locationDTO);
    }

    @Test
    @DisplayName("LocationService should reuse existing GeographicPoint for same coordinates")
    public void testCreateLocationEntityReusesGeographicPoint() {
        double latitude = 48.8566;
        double longitude = 2.3522;

        CoordinatesDTO coordinatesDTO = mock(CoordinatesDTO.class);
        when(coordinatesDTO.latitude()).thenReturn(latitude);
        when(coordinatesDTO.longitude()).thenReturn(longitude);

        LocationDTO locationDTO = mock(LocationDTO.class);
        when(locationDTO.coordinates()).thenReturn(coordinatesDTO);

        Location mappedLocation = mock(Location.class);
        when(itineraryMapper.toLocation(locationDTO)).thenReturn(mappedLocation);

        GeographicPoint sharedGeographicPoint = mock(GeographicPoint.class);
        when(geographicPointService.findOrCreateByCoordinates(latitude, longitude))
            .thenReturn(sharedGeographicPoint);

        locationService.createLocationEntity(locationDTO);
        locationService.createLocationEntity(locationDTO);

        verify(geographicPointService, times(2)).findOrCreateByCoordinates(latitude, longitude);
    }
}
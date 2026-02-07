package com.tripflow.unit;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.tripflow.model.itinerary.GeographicPoint;
import com.tripflow.repository.itinerary.GeographicPointRepository;
import com.tripflow.service.itinerary.GeographicPointService;

@Tag("unit")
public class GeographicPointServiceTest {
    private GeographicPointRepository geographicPointRepository;
    private GeographicPointService geographicPointService;

    @BeforeEach
    public void setUp() {
        this.geographicPointRepository = mock(GeographicPointRepository.class);
        this.geographicPointService = new GeographicPointService(geographicPointRepository);
    }

    @Test
    @DisplayName("GeographicPointService should find existing point by coordinates")
    public void testFindOrCreateByCoordinatesExisting() {
        Double latitude = 48.8566;
        Double longitude = 2.3522;

        GeographicPoint existingPoint = new GeographicPoint();
        existingPoint.setId(1L);
        existingPoint.setLatitude(latitude);
        existingPoint.setLongitude(longitude);

        when(geographicPointRepository.findByLatitudeAndLongitude(latitude, longitude))
            .thenReturn(Optional.of(existingPoint));

        GeographicPoint result = geographicPointService.findOrCreateByCoordinates(latitude, longitude);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals(latitude, result.getLatitude());
        assertEquals(longitude, result.getLongitude());
        verify(geographicPointRepository, never()).save(any());
    }

    @Test
    @DisplayName("GeographicPointService should create new point when not exists")
    public void testFindOrCreateByCoordinatesNew() {
        Double latitude = 40.7128;
        Double longitude = -74.0060;

        when(geographicPointRepository.findByLatitudeAndLongitude(latitude, longitude))
            .thenReturn(Optional.empty());

        GeographicPoint newPoint = new GeographicPoint();
        newPoint.setId(2L);
        newPoint.setLatitude(latitude);
        newPoint.setLongitude(longitude);

        when(geographicPointRepository.save(any(GeographicPoint.class))).thenReturn(newPoint);

        GeographicPoint result = geographicPointService.findOrCreateByCoordinates(latitude, longitude);

        assertNotNull(result);
        assertEquals(2L, result.getId());
        assertEquals(latitude, result.getLatitude());
        assertEquals(longitude, result.getLongitude());
        verify(geographicPointRepository).save(any(GeographicPoint.class));
    }

    @Test
    @DisplayName("GeographicPointService should return default point (0,0)")
    public void testGetDefaultPoint() {
        GeographicPoint defaultPoint = new GeographicPoint();
        defaultPoint.setId(1L);
        defaultPoint.setLatitude(0.0);
        defaultPoint.setLongitude(0.0);

        when(geographicPointRepository.findByLatitudeAndLongitude(0.0, 0.0))
            .thenReturn(Optional.of(defaultPoint));

        GeographicPoint result = geographicPointService.getDefaultPoint();

        assertNotNull(result);
        assertEquals(0.0, result.getLatitude());
        assertEquals(0.0, result.getLongitude());
    }

    @Test
    @DisplayName("GeographicPointService should throw exception if default point not initialized")
    public void testGetDefaultPointNotInitialized() {
        when(geographicPointRepository.findByLatitudeAndLongitude(0.0, 0.0))
            .thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () ->
            geographicPointService.getDefaultPoint()
        );
        assertEquals("Default geographic point not initialized", ex.getMessage());
    }

    @Test
    @DisplayName("GeographicPointService should handle edge case coordinates (North Pole)")
    public void testFindOrCreateByCoordinatesNorthPole() {
        Double latitude = 90.0;
        Double longitude = 0.0;

        when(geographicPointRepository.findByLatitudeAndLongitude(latitude, longitude))
            .thenReturn(Optional.empty());

        GeographicPoint newPoint = new GeographicPoint();
        newPoint.setLatitude(latitude);
        newPoint.setLongitude(longitude);

        when(geographicPointRepository.save(any(GeographicPoint.class))).thenReturn(newPoint);

        GeographicPoint result = geographicPointService.findOrCreateByCoordinates(latitude, longitude);

        assertNotNull(result);
        assertEquals(90.0, result.getLatitude());
        assertEquals(0.0, result.getLongitude());
    }

    @Test
    @DisplayName("GeographicPointService should handle negative coordinates")
    public void testFindOrCreateByCoordinatesNegative() {
        Double latitude = -33.8688;
        Double longitude = 151.2093;

        when(geographicPointRepository.findByLatitudeAndLongitude(latitude, longitude))
            .thenReturn(Optional.empty());

        GeographicPoint newPoint = new GeographicPoint();
        newPoint.setLatitude(latitude);
        newPoint.setLongitude(longitude);

        when(geographicPointRepository.save(any(GeographicPoint.class))).thenReturn(newPoint);

        GeographicPoint result = geographicPointService.findOrCreateByCoordinates(latitude, longitude);

        assertNotNull(result);
        assertEquals(latitude, result.getLatitude());
        assertEquals(longitude, result.getLongitude());
    }

    @Test
    @DisplayName("GeographicPointService should reuse same point for identical coordinates")
    public void testFindOrCreateByCoordinatesReuse() {
        Double latitude = 51.5074;
        Double longitude = -0.1278;

        GeographicPoint existingPoint = new GeographicPoint();
        existingPoint.setId(5L);
        existingPoint.setLatitude(latitude);
        existingPoint.setLongitude(longitude);

        when(geographicPointRepository.findByLatitudeAndLongitude(latitude, longitude))
            .thenReturn(Optional.of(existingPoint));

        GeographicPoint result1 = geographicPointService.findOrCreateByCoordinates(latitude, longitude);
        GeographicPoint result2 = geographicPointService.findOrCreateByCoordinates(latitude, longitude);

        assertEquals(result1.getId(), result2.getId());
        verify(geographicPointRepository, times(2)).findByLatitudeAndLongitude(latitude, longitude);
        verify(geographicPointRepository, never()).save(any());
    }
}
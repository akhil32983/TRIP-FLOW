package com.tripflow.service.itinerary;

import org.springframework.stereotype.Service;

import com.tripflow.dto.itinerary.ItineraryMapper;
import com.tripflow.dto.itinerary.LocationDTO;
import com.tripflow.model.itinerary.GeographicPoint;
import com.tripflow.model.itinerary.Location;

@Service
public class LocationService {
    private final GeographicPointService geographicPointService;
    private final ItineraryMapper itineraryMapper;

    public LocationService(
        GeographicPointService geographicPointService,
        ItineraryMapper itineraryMapper
    ) {
        this.geographicPointService = geographicPointService;
        this.itineraryMapper = itineraryMapper;
    }

    /**
     * Creates a new location entity from the provided LocationDTO.
     * Links it to the appropriate geographic point (shared by coordinates).
     *
     * @param locationDTO the DTO containing location data
     * @param activity the Activity to associate with the location
     * @return the saved Location entity
     */
    public Location createLocationEntity(LocationDTO locationDTO) {
        Location location;

        if (locationDTO == null) {
            location = new Location();
        } else {
            location = this.itineraryMapper.toLocation(locationDTO);
        }

        GeographicPoint coordinates;
        if (
            locationDTO == null ||
            locationDTO.coordinates() == null
        ) {
            coordinates = this.geographicPointService.getDefaultPoint();
        } else {
            coordinates = this.geographicPointService.findOrCreateByCoordinates(
                locationDTO.coordinates().latitude(),
                locationDTO.coordinates().longitude()
            );
        }
        
        // Link the location to the geographic point
        location.setCoordinates(coordinates);
        
        return location;
    }
}

package com.tripflow.service.itinerary;

import org.springframework.stereotype.Service;

import com.tripflow.dto.itinerary.ItineraryMapper;
import com.tripflow.dto.itinerary.LocationDTO;
import com.tripflow.model.itinerary.Activity;
import com.tripflow.model.itinerary.Location;
import com.tripflow.repository.itinerary.LocationRepository;

@Service
public class LocationService {
    private final LocationRepository locationRepository;
    private final ItineraryMapper itineraryMapper;

    public LocationService(LocationRepository locationRepository, ItineraryMapper itineraryMapper) {
        this.locationRepository = locationRepository;
        this.itineraryMapper = itineraryMapper;
    }

    /**
     * Finds a location entity by its coordinates.
     *
     * @param latitude  the latitude of the location to find
     * @param longitude the longitude of the location to find
     * @return the Location entity representing the found location or null if not found
     */
    public Location findEntityByLatAndLon(double latitude, double longitude) {
        Location location = this.locationRepository
            .findByLatitudeAndLongitude(latitude, longitude).orElse(null);

        return location;
    }

    /**
     * Creates a new location entity from the provided LocationDTO.
     *
     * @param locationDTO the DTO containing location data
     * @param activity the Activity to associate with the location
     * @return the saved Location entity
     */
    public Location createLocationEntity(LocationDTO locationDTO, Activity activity) {
        Location location = this.itineraryMapper.toLocation(locationDTO);
        location.addActivity(activity);

        return this.locationRepository.save(location);
    }
}

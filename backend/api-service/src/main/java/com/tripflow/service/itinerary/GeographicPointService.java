package com.tripflow.service.itinerary;

import org.springframework.stereotype.Service;

import com.tripflow.model.itinerary.GeographicPoint;
import com.tripflow.repository.itinerary.GeographicPointRepository;

import jakarta.annotation.PostConstruct;

@Service
public class GeographicPointService {
    
    private final GeographicPointRepository geographicPointRepository;

    public GeographicPointService(GeographicPointRepository geographicPointRepository) {
        this.geographicPointRepository = geographicPointRepository;
    }

    @PostConstruct
    public void initDefaultPoint() {
        if (geographicPointRepository.findByLatitudeAndLongitude(0.0, 0.0).isEmpty()) {
            GeographicPoint defaultPoint = new GeographicPoint();
            defaultPoint.setLatitude(0.0);
            defaultPoint.setLongitude(0.0);
            geographicPointRepository.save(defaultPoint);
        }
    }

    public GeographicPoint findOrCreateByCoordinates(Double latitude, Double longitude) {
        GeographicPoint point = this.geographicPointRepository
            .findByLatitudeAndLongitude(latitude, longitude)
            .orElse(null);
            
        return point != null ? point : createGeographicPoint(latitude, longitude);
    }

    public GeographicPoint getDefaultPoint() {
        return geographicPointRepository
            .findByLatitudeAndLongitude(0.0, 0.0)
            .orElseThrow(() -> new RuntimeException("Default geographic point not initialized"));
    }

    private GeographicPoint createGeographicPoint(Double latitude, Double longitude) {
        GeographicPoint point = new GeographicPoint();
        point.setLatitude(latitude);
        point.setLongitude(longitude);
        return geographicPointRepository.save(point);
    }

}
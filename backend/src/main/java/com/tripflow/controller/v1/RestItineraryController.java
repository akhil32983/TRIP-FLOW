package com.tripflow.controller.v1;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tripflow.dto.itinerary.ItineraryDTO;
import com.tripflow.service.itinerary.ItineraryService;

@RestController
@RequestMapping("/api/v1/itineraries")
public class RestItineraryController {
    private final ItineraryService itineraryService;

    public RestItineraryController(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }

    @PostMapping({"", "/"})
    public ResponseEntity<ItineraryDTO> createItinerary(@RequestBody ItineraryDTO itineraryDTO) {
        try {
            ItineraryDTO createdItinerary = this.itineraryService.createItinerary(itineraryDTO);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createdItinerary.id()).toUri();

            return ResponseEntity.created(location).body(createdItinerary);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
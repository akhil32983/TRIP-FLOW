package com.tripflow.controller.v1;

import java.net.URI;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tripflow.dto.itinerary.ExtendedItineraryDTO;
import com.tripflow.dto.itinerary.ItineraryDTO;
import com.tripflow.dto.shared.PaginatedDTO;
import com.tripflow.service.itinerary.ItineraryService;

@RestController
@RequestMapping("/api/v1/itineraries")
public class RestItineraryController {
    private final ItineraryService itineraryService;

    public RestItineraryController(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }

    @PostMapping({"", "/"})
    public ResponseEntity<ExtendedItineraryDTO> createItinerary(@RequestBody ExtendedItineraryDTO itineraryDTO) {
        try {
            ExtendedItineraryDTO createdItinerary = this.itineraryService.createItinerary(itineraryDTO);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createdItinerary.id()).toUri();

            return ResponseEntity.created(location).body(createdItinerary);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping({"", "/"})
    public ResponseEntity<PaginatedDTO<ItineraryDTO>> getAllItineraries(
        @PageableDefault(page = 0, size = 10) Pageable pageable,
        @RequestParam(required = false) String search
    ) {
        try {
            PaginatedDTO<ItineraryDTO> itineraries = this.itineraryService.getAllItineraries(pageable, search);
            return ResponseEntity.ok(itineraries);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExtendedItineraryDTO> getItineraryById(@PathVariable Long id) {
        try {
            ExtendedItineraryDTO itinerary = this.itineraryService.getItineraryById(id);
            return ResponseEntity.ok(itinerary);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(null);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExtendedItineraryDTO> updateItinerary(
        @PathVariable Long id, @RequestBody ExtendedItineraryDTO itineraryDTO
    ) {
        try {
            ExtendedItineraryDTO updatedItinerary = this.itineraryService.updateItinerary(id, itineraryDTO);

            return ResponseEntity.ok(updatedItinerary);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(null);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItinerary(@PathVariable Long id) {
        try {
            this.itineraryService.deleteItinerary(id);
            return ResponseEntity.noContent().build();
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
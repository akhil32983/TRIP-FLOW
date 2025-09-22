package com.tripflow.service.itinerary;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.tripflow.dto.itinerary.ItineraryDTO;
import com.tripflow.dto.itinerary.ItineraryDayDTO;
import com.tripflow.dto.itinerary.ItineraryMapper;
import com.tripflow.dto.shared.PaginatedDTO;
import com.tripflow.model.User;
import com.tripflow.model.itinerary.Itinerary;
import com.tripflow.model.itinerary.ItineraryDay;
import com.tripflow.repository.itinerary.ItineraryRepository;
import com.tripflow.service.UserService;

import jakarta.transaction.Transactional;

@Service
public class ItineraryService {
    private final ItineraryRepository itineraryRepository;
    private final UserService userService;
    private final ItineraryDayService itineraryDayService;
    private final ItineraryMapper itineraryMapper;


    public ItineraryService(
        ItineraryRepository itineraryRepository,
        UserService userService,
        ItineraryDayService itineraryDayService,
        ItineraryMapper itineraryMapper
    ) {
        this.itineraryRepository = itineraryRepository;
        this.userService = userService;
        this.itineraryDayService = itineraryDayService;
        this.itineraryMapper = itineraryMapper;
    }

    /**
     * Creates a new itinerary from the provided ItineraryDTO.
     *
     * @param itineraryDTO the DTO containing itinerary data
     * @return the created ItineraryDTO
     */
    @Transactional
    public ItineraryDTO createItinerary(ItineraryDTO itineraryDTO) {
        User authenticatedUser = this.userService.getAuthenticatedUser();

        Itinerary newItinerary = new Itinerary();
        newItinerary.setPlace(itineraryDTO.place());

        List<ItineraryDayDTO> days = itineraryDTO.days();

        // Iterate through days in the itinerary and create each day
        for (ItineraryDayDTO day : days) {
            ItineraryDay newDay = this.itineraryDayService.createItineraryDayEntity(day, newItinerary);
            newItinerary.addDay(newDay);
        }

        // Set the user for the itinerary
        authenticatedUser.addItinerary(newItinerary);
        newItinerary.setUser(authenticatedUser);

        return this.itineraryMapper.toDTO(this.itineraryRepository.save(newItinerary));
    }

    /**
     * Retrieves all itineraries for the authenticated user, paginated.
     *
     * @param pageable pagination information
     * @return a PaginatedDTO containing a list of ItineraryDTOs
     */
    @Transactional
    public PaginatedDTO<ItineraryDTO> getAllItineraries(Pageable pageable) {
        User authenticatedUser = this.userService.getAuthenticatedUser();

        // Retrieve paginated itineraries for the authenticated user
        Page<Itinerary> itinerariesPage = this.itineraryRepository.findAllByUser(authenticatedUser, pageable);

        // Map the retrieved itineraries to DTOs
        List<ItineraryDTO> itineraryDTOs = this.itineraryMapper.toDTOs(itinerariesPage.getContent());

        return new PaginatedDTO<ItineraryDTO>(
            itineraryDTOs,
            itinerariesPage.getNumber(),
            itinerariesPage.getTotalPages(),
            itinerariesPage.getTotalElements(),
            itinerariesPage.getSize(),
            itinerariesPage.isLast()
        );
    }

    /**
     * Retrieves an itinerary by its ID, ensuring the authenticated user is the owner.
     *
     * @param id the ID of the itinerary to retrieve
     * @return the ItineraryDTO for the specified ID
     * @throws ResponseStatusException NOT_FOUND | FORBIDDEN
     */
    @Transactional
    public ItineraryDTO getItineraryById(Long id) throws ResponseStatusException {
        Itinerary itinerary = this.itineraryRepository.findById(id).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Itinerary with ID %d not found", id))
        );

        // Ensure the authenticated user is the owner of the itinerary
        User authenticatedUser = this.userService.getAuthenticatedUser();
        if (!itinerary.getUser().getId().equals(authenticatedUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have permission to access this itinerary");
        }

        return this.itineraryMapper.toDTO(itinerary);
    }

    /**
     * Updates an existing itinerary with the provided ItineraryDTO.
     *
     * @param id the ID of the itinerary to update
     * @param itineraryDTO the DTO containing updated itinerary data
     * @return the updated ItineraryDTO
     * @throws ResponseStatusException NOT_FOUND | FORBIDDEN
     */
    @Transactional
    public ItineraryDTO updateItinerary(Long id, ItineraryDTO itineraryDTO) throws ResponseStatusException {
        Itinerary itinerary = this.itineraryRepository.findById(id).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Itinerary with ID %d not found", id))
        );

        // Ensure the authenticated user is the owner of the itinerary
        User authenticatedUser = this.userService.getAuthenticatedUser();
        if (!itinerary.getUser().getId().equals(authenticatedUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have permission to update this itinerary");
        }

        // Update the itinerary's place
        itinerary.setPlace(itineraryDTO.place());

        // Clear existing days
        this.itineraryDayService.deleteAllDaysByItinerary(itinerary);

        // Iterate through the new days in the itinerary and create each day
        List<ItineraryDay> days = new ArrayList<>();
        for (ItineraryDayDTO dayDTO : itineraryDTO.days()) {
            ItineraryDay newDay = this.itineraryDayService.createItineraryDayEntity(dayDTO, itinerary);
            days.add(newDay);
        }
        itinerary.setDays(days);

        // Update itinerary's status
        if (itineraryDTO.status() != null) {
            itinerary.setStatus(itineraryDTO.status());
        }

        // Increment the updated count
        itinerary.setUpdatedCount(itinerary.getUpdatedCount() + 1);

        // Save and return the updated DTO
        return this.itineraryMapper.toDTO(this.itineraryRepository.save(itinerary));
    }
}

package com.tripflow.service.itinerary;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tripflow.dto.itinerary.ItineraryDTO;
import com.tripflow.dto.itinerary.ItineraryDayDTO;
import com.tripflow.dto.itinerary.ItineraryMapper;
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
}

package com.tripflow.service.itinerary;

import org.springframework.stereotype.Service;

import com.tripflow.dto.itinerary.ActivityDTO;
import com.tripflow.dto.itinerary.ItineraryDayDTO;
import com.tripflow.model.itinerary.Activity;
import com.tripflow.model.itinerary.Itinerary;
import com.tripflow.model.itinerary.ItineraryDay;
import com.tripflow.repository.itinerary.ItineraryDayRepository;

@Service
public class ItineraryDayService {
    private final ItineraryDayRepository itineraryDayRepository;
    private final ActivityService activityService;

    public ItineraryDayService(ItineraryDayRepository itineraryDayRepository, ActivityService activityService) {
        this.itineraryDayRepository = itineraryDayRepository;
        this.activityService = activityService;
    }
    
    /**
     * Creates a new ItineraryDay entity from the provided ItineraryDayDTO.
     *
     * @param dayDTO the DTO containing day data
     * @return the created ItineraryDay entity
     */
    public ItineraryDay createItineraryDayEntity(ItineraryDayDTO dayDTO, Itinerary itinerary) {
        ItineraryDay day = new ItineraryDay();
        day.setDay(dayDTO.day());

        // Iterate through activities in the day
        for (ActivityDTO activityDTO : dayDTO.activities()) {
            Activity activity = this.activityService.createActivityEntity(activityDTO);
            day.addActivity(activity);
        }

        // Set the itinerary for the day
        day.setItinerary(itinerary);

        return day;
    }

    /**
     * Deletes all days associated with the given itinerary.
     *
     * @param itinerary the itinerary whose days are to be deleted
     */
    public void deleteAllDaysByItinerary(Itinerary itinerary) {
        if (itinerary != null && itinerary.getDays() != null) {
            for (ItineraryDay day : itinerary.getDays()) {
                this.itineraryDayRepository.delete(day);
            }

            itinerary.getDays().clear();
        }
    }
}

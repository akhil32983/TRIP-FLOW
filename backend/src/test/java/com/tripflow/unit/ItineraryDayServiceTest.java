package com.tripflow.unit;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.tripflow.dto.itinerary.ActivityDTO;
import com.tripflow.dto.itinerary.ItineraryDayDTO;
import com.tripflow.model.itinerary.Activity;
import com.tripflow.model.itinerary.Itinerary;
import com.tripflow.model.itinerary.ItineraryDay;
import com.tripflow.repository.itinerary.ItineraryDayRepository;
import com.tripflow.service.itinerary.ItineraryDayService;
import com.tripflow.service.itinerary.ActivityService;

@Tag("Unit")
public class ItineraryDayServiceTest {
    private ItineraryDayRepository itineraryDayRepository;
    private ActivityService activityService;
    private ItineraryDayService itineraryDayService;

    @BeforeEach
    public void setUp() {
        this.itineraryDayRepository = mock(ItineraryDayRepository.class);
        this.activityService = mock(ActivityService.class);

        this.itineraryDayService = new ItineraryDayService(
            itineraryDayRepository, activityService
        );
    }

    @Test
    @DisplayName("ItineraryDayService should create itinerary day with activities")
    public void testCreateItineraryDayEntityWithActivities() {
        ActivityDTO activityDTO1 = mock(ActivityDTO.class);
        ActivityDTO activityDTO2 = mock(ActivityDTO.class);
        List<ActivityDTO> activityDTOs = List.of(activityDTO1, activityDTO2);

        ItineraryDayDTO dayDTO = mock(ItineraryDayDTO.class);
        when(dayDTO.day()).thenReturn(1);
        when(dayDTO.activities()).thenReturn(activityDTOs);

        Itinerary itinerary = mock(Itinerary.class);

        Activity activity1 = mock(Activity.class);
        Activity activity2 = mock(Activity.class);
        when(activityService.createActivityEntity(activityDTO1)).thenReturn(activity1);
        when(activityService.createActivityEntity(activityDTO2)).thenReturn(activity2);

        ItineraryDay result = itineraryDayService.createItineraryDayEntity(dayDTO, itinerary);

        assertNotNull(result);
        assertEquals(1, result.getDay());
        assertEquals(itinerary, result.getItinerary());
        verify(activityService).createActivityEntity(activityDTO1);
        verify(activityService).createActivityEntity(activityDTO2);
    }

    @Test
    @DisplayName("ItineraryDayService should create itinerary day with no activities")
    public void testCreateItineraryDayEntityWithNoActivities() {
        ItineraryDayDTO dayDTO = mock(ItineraryDayDTO.class);
        when(dayDTO.day()).thenReturn(2);
        when(dayDTO.activities()).thenReturn(List.of());

        Itinerary itinerary = mock(Itinerary.class);

        ItineraryDay result = itineraryDayService.createItineraryDayEntity(dayDTO, itinerary);

        assertNotNull(result);
        assertEquals(2, result.getDay());
        assertEquals(itinerary, result.getItinerary());
        verify(activityService, never()).createActivityEntity(any());
    }

    @Test
    @DisplayName("ItineraryDayService should set correct day number")
    public void testCreateItineraryDayEntitySetsDayNumber() {
        ItineraryDayDTO dayDTO = mock(ItineraryDayDTO.class);
        when(dayDTO.day()).thenReturn(5);
        when(dayDTO.activities()).thenReturn(List.of());

        Itinerary itinerary = mock(Itinerary.class);

        ItineraryDay result = itineraryDayService.createItineraryDayEntity(dayDTO, itinerary);

        assertEquals(5, result.getDay());
        assertEquals(itinerary, result.getItinerary());
    }

    @Test
    @DisplayName("ItineraryDayService should delete all days from itinerary")
    public void testDeleteAllDaysByItinerary() {
        ItineraryDay day1 = mock(ItineraryDay.class);
        ItineraryDay day2 = mock(ItineraryDay.class);
        List<ItineraryDay> days = new ArrayList<>();
        days.add(day1);
        days.add(day2);

        Itinerary itinerary = mock(Itinerary.class);
        when(itinerary.getDays()).thenReturn(days);

        itineraryDayService.deleteAllDaysByItinerary(itinerary);

        verify(itineraryDayRepository).delete(day1);
        verify(itineraryDayRepository).delete(day2);
        assertTrue(days.isEmpty());
    }

    @Test
    @DisplayName("ItineraryDayService should handle null itinerary gracefully")
    public void testDeleteAllDaysByItineraryWithNullItinerary() {
        itineraryDayService.deleteAllDaysByItinerary(null);

        verify(itineraryDayRepository, never()).delete(any());
    }

    @Test
    @DisplayName("ItineraryDayService should handle itinerary with null days")
    public void testDeleteAllDaysByItineraryWithNullDays() {
        Itinerary itinerary = mock(Itinerary.class);
        when(itinerary.getDays()).thenReturn(null);

        itineraryDayService.deleteAllDaysByItinerary(itinerary);

        verify(itineraryDayRepository, never()).delete(any());
    }

    @Test
    @DisplayName("ItineraryDayService should handle itinerary with empty days list")
    public void testDeleteAllDaysByItineraryWithEmptyDays() {
        List<ItineraryDay> emptyDays = new ArrayList<>();
        Itinerary itinerary = mock(Itinerary.class);
        when(itinerary.getDays()).thenReturn(emptyDays);

        itineraryDayService.deleteAllDaysByItinerary(itinerary);

        verify(itineraryDayRepository, never()).delete(any());
        assertTrue(emptyDays.isEmpty());
    }

    @Test
    @DisplayName("ItineraryDayService should call ActivityService for each activity")
    public void testCreateItineraryDayEntityCallsActivityServiceForEachActivity() {
        ActivityDTO activityDTO1 = mock(ActivityDTO.class);
        ActivityDTO activityDTO2 = mock(ActivityDTO.class);
        ActivityDTO activityDTO3 = mock(ActivityDTO.class);
        List<ActivityDTO> activityDTOs = List.of(activityDTO1, activityDTO2, activityDTO3);

        ItineraryDayDTO dayDTO = mock(ItineraryDayDTO.class);
        when(dayDTO.day()).thenReturn(3);
        when(dayDTO.activities()).thenReturn(activityDTOs);

        Itinerary itinerary = mock(Itinerary.class);

        Activity activity1 = mock(Activity.class);
        Activity activity2 = mock(Activity.class);
        Activity activity3 = mock(Activity.class);
        when(activityService.createActivityEntity(activityDTO1)).thenReturn(activity1);
        when(activityService.createActivityEntity(activityDTO2)).thenReturn(activity2);
        when(activityService.createActivityEntity(activityDTO3)).thenReturn(activity3);

        ItineraryDay result = itineraryDayService.createItineraryDayEntity(dayDTO, itinerary);

        verify(activityService, times(3)).createActivityEntity(any(ActivityDTO.class));
        verify(activityService).createActivityEntity(activityDTO1);
        verify(activityService).createActivityEntity(activityDTO2);
        verify(activityService).createActivityEntity(activityDTO3);
        assertEquals(3, result.getDay());
    }
}
package com.tripflow.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.tripflow.dto.itinerary.ActivityDTO;
import com.tripflow.dto.itinerary.ExtendedItineraryDTO;
import com.tripflow.dto.itinerary.ItineraryDTO;
import com.tripflow.dto.itinerary.ItineraryDayDTO;
import com.tripflow.dto.itinerary.LocationDTO;
import com.tripflow.model.itinerary.Activity;
import com.tripflow.model.itinerary.Itinerary;
import com.tripflow.model.itinerary.ItineraryDay;
import com.tripflow.model.itinerary.Location;

@Mapper(componentModel = "spring")
public interface ItineraryMapper {

    // To DTO ==>

    @Mapping(target = "countDays", expression = "java(itinerary.getDays().size())")
    @Mapping(target = "coverImage", source = "coverImage")
    ItineraryDTO toDTO(Itinerary itinerary);

    @Mapping(target = "countDays", expression = "java(itinerary.getDays().size())")
    @Mapping(target = "coverImage", source = "coverImage")
    ExtendedItineraryDTO toExtendedDTO(Itinerary itinerary);
    List<ItineraryDTO> toDTOs(List<Itinerary> itineraries);

    ItineraryDayDTO toItineraryDayDTO(ItineraryDay day);
    List<ItineraryDayDTO> toItineraryDayDTOs(List<ItineraryDay> days);

    ActivityDTO toActivityDTO(Activity activity);
    List<ActivityDTO> toActivityDTOs(List<Activity> activities);

    @Mapping(target = "coordinates.latitude", source = "latitude")
    @Mapping(target = "coordinates.longitude", source = "longitude")
    LocationDTO toLocationDTO(Location location);

    // To DOMAIN ==>

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "coordinates", ignore = true)
    @Mapping(target = "activity", ignore = true)
    Location toLocation(LocationDTO locationDTO);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "location", ignore = true)
    @Mapping(target = "itineraryDay", ignore = true)
    Activity toActivity(ActivityDTO activityDTO);
}
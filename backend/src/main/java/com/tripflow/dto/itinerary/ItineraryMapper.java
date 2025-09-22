package com.tripflow.dto.itinerary;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.tripflow.model.itinerary.Activity;
import com.tripflow.model.itinerary.Itinerary;
import com.tripflow.model.itinerary.ItineraryDay;
import com.tripflow.model.itinerary.Location;

@Mapper(componentModel = "spring")
public interface ItineraryMapper {

    // To DTO ==>

    ItineraryDTO toDTO(Itinerary itinerary);
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
    @Mapping(target = "latitude", source = "coordinates.latitude")
    @Mapping(target = "longitude", source = "coordinates.longitude")
    Location toLocation(LocationDTO locationDTO);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "itineraryDay", ignore = true)
    Activity toActivity(ActivityDTO activityDTO);
}
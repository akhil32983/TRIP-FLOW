package com.tripflow.utils;

import java.util.List;

import com.tripflow.dto.externalImage.ExternalImageDTO;
import com.tripflow.dto.itinerary.ActivityDTO;
import com.tripflow.dto.itinerary.CoordinatesDTO;
import com.tripflow.dto.itinerary.ExtendedItineraryDTO;
import com.tripflow.dto.itinerary.ItineraryDayDTO;
import com.tripflow.dto.itinerary.ItineraryStatusDTO;
import com.tripflow.dto.itinerary.LocationDTO;

public class AIItineraryMock {
    public static ExtendedItineraryDTO getItineraryMock() {
        return new ExtendedItineraryDTO(
            1L,
            "Aventura en Nueva York",
            "New York, USA",
            2,
            2500.0,
            "2025-12-25",
            List.of("Culture", "Food", "Shopping", "Entertainment"),
            0L,
            ItineraryStatusDTO.DRAFT,
            List.of(
                new ItineraryDayDTO(
                    1,
                    List.of(
                        new ActivityDTO(
                            "Visit Statue of Liberty",
                            "Take the ferry to Liberty Island and explore this iconic symbol of freedom",
                            new LocationDTO(
                                "Statue of Liberty",
                                "Liberty Island, New York, NY 10004",
                                new CoordinatesDTO(40.6892, -74.0445)
                            ),
                            "09:00",
                            "3h"
                        ),
                        new ActivityDTO(
                            "Lunch at Stone Street",
                            "Enjoy lunch at one of the historic restaurants in the Financial District",
                            new LocationDTO(
                                "Stone Street Historic District",
                                "Stone St, New York, NY 10004",
                                new CoordinatesDTO(40.7041, -74.0112)
                            ),
                            "12:30",
                            "1h 30m"
                        ),
                        new ActivityDTO(
                            "9/11 Memorial & Museum",
                            "Pay respects and learn about the events of September 11, 2001",
                            new LocationDTO(
                                "9/11 Memorial & Museum",
                                "180 Greenwich St, New York, NY 10007",
                                new CoordinatesDTO(40.7115, -74.0134)
                            ),
                            "14:30",
                            "2h 30m"
                        ),
                        new ActivityDTO(
                            "Brooklyn Bridge Walk",
                            "Walk across the iconic Brooklyn Bridge at sunset",
                            new LocationDTO(
                                "Brooklyn Bridge",
                                "Brooklyn Bridge, New York, NY 10038",
                                new CoordinatesDTO(40.7061, -73.9969)
                            ),
                            "17:30",
                            "1h 30m"
                        )
                    )
                ),
                new ItineraryDayDTO(
                    2,
                    List.of(
                        new ActivityDTO(
                            "Central Park Morning",
                            "Stroll through Central Park, visit Bethesda Fountain and Bow Bridge",
                            new LocationDTO(
                                "Central Park",
                                "Central Park, New York, NY 10024",
                                new CoordinatesDTO(40.7829, -73.9654)
                            ),
                            "08:30",
                            "2h"
                        ),
                        new ActivityDTO(
                            "Metropolitan Museum of Art",
                            "Explore one of the world's largest and finest art museums",
                            new LocationDTO(
                                "The Met",
                                "1000 5th Ave, New York, NY 10028",
                                new CoordinatesDTO(40.7794, -73.9632)
                            ),
                            "11:00",
                            "3h"
                        ),
                        new ActivityDTO(
                            "Lunch at Upper East Side",
                            "Enjoy a classic New York deli experience",
                            new LocationDTO(
                                "Upper East Side",
                                "Madison Ave, New York, NY 10028",
                                new CoordinatesDTO(40.7736, -73.9566)
                            ),
                            "14:30",
                            "1h"
                        ),
                        new ActivityDTO(
                            "Times Square & Broadway",
                            "Experience the energy of Times Square and catch a Broadway show",
                            new LocationDTO(
                                "Times Square",
                                "Times Square, Manhattan, NY 10036",
                                new CoordinatesDTO(40.7580, -73.9855)
                            ),
                            "18:00",
                            "4h"
                        )
                    )
                ),
                new ItineraryDayDTO(
                    3,
                    List.of(
                        new ActivityDTO(
                            "Empire State Building",
                            "Visit the observation deck for panoramic views of NYC",
                            new LocationDTO(
                                "Empire State Building",
                                "20 W 34th St, New York, NY 10001",
                                new CoordinatesDTO(40.7484, -73.9857)
                            ),
                            "09:00",
                            "2h"
                        ),
                        new ActivityDTO(
                            "High Line Park",
                            "Walk the elevated park built on a historic freight rail line",
                            new LocationDTO(
                                "High Line",
                                "High Line, New York, NY 10011",
                                new CoordinatesDTO(40.7480, -74.0048)
                            ),
                            "11:30",
                            "1h 30m"
                        ),
                        new ActivityDTO(
                            "Chelsea Market",
                            "Explore this food hall and shopping mall in a former factory",
                            new LocationDTO(
                                "Chelsea Market",
                                "75 9th Ave, New York, NY 10011",
                                new CoordinatesDTO(40.7425, -74.0059)
                            ),
                            "13:30",
                            "2h"
                        ),
                        new ActivityDTO(
                            "Sunset at Top of the Rock",
                            "End your trip with stunning sunset views from Rockefeller Center",
                            new LocationDTO(
                                "Top of the Rock",
                                "30 Rockefeller Plaza, New York, NY 10112",
                                new CoordinatesDTO(40.7587, -73.9787)
                            ),
                            "17:00",
                            "2h"
                        )
                    )
                )
            ),
            3,
            new ExternalImageDTO(
                "https://example.com/image.jpg",
                "A beautiful view of New York City skyline",
                "photographer123"
            )
        );
    }
}

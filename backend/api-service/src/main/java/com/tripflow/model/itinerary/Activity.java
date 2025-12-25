package com.tripflow.model.itinerary;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Column;

@Entity
public class Activity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String activity;

    @Column(columnDefinition = "TEXT")
    private String details;

    private String time;

    private String duration;

    @ManyToOne(cascade = CascadeType.ALL)
    private ItineraryDay itineraryDay;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Location location;

    // [Getters and Setters] ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public ItineraryDay getItineraryDay() {
        return itineraryDay;
    }

    public void setItineraryDay(ItineraryDay itineraryDay) {
        this.itineraryDay = itineraryDay;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;;
    }
}

package com.tripflow.model.itinerary;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class ItineraryDay {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int day;

    @ManyToOne
    private Itinerary itinerary;

    @OneToMany(mappedBy = "itineraryDay", cascade = CascadeType.ALL)
    private List<Activity> activities;

    // [Methods] =====================================================

    /**
     * Adds an activity to the itinerary day.
     * 
     * @param activity the activity to add
     */
    public void addActivity(Activity activity) {
        if (activity != null) {
            if (this.activities == null) this.activities = new ArrayList<>();
            this.activities.add(activity);
            activity.setItineraryDay(this);
        }
    }

    // [Getters and Setters] ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public Itinerary getItinerary() {
        return itinerary;
    }

    public void setItinerary(Itinerary itinerary) {
        this.itinerary = itinerary;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }
}

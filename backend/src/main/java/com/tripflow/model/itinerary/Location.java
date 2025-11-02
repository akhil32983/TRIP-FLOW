package com.tripflow.model.itinerary;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Location {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "geographic_point_id", nullable = false)
    private GeographicPoint coordinates;

    @OneToOne(mappedBy = "location")
    private Activity activity;

    public Double getLatitude() {
        return this.coordinates != null ? this.coordinates.getLatitude() : null;
    }

    public Double getLongitude() {
        return this.coordinates != null ? this.coordinates.getLongitude() : null;
    }

    // [Getters and Setters] ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public GeographicPoint getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(GeographicPoint coordinates) {
        this.coordinates = coordinates;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
        if (activity != null && activity.getLocation() != this) {
            activity.setLocation(this);
        }
    }
}
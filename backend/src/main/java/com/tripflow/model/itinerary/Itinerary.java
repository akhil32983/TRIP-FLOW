package com.tripflow.model.itinerary;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;

import com.tripflow.model.User;
import com.tripflow.model.types.ItineraryStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Itinerary {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String place;

    private long updatedCount = 0;

    @Enumerated(EnumType.STRING)
    private ItineraryStatus status = ItineraryStatus.DRAFT;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "itinerary", cascade = CascadeType.ALL)
    private List<ItineraryDay> days;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Timestamp createdAt = Timestamp.valueOf(LocalDateTime.now());

    // [Methods] ======================================================

    /**
     * Adds a day to the itinerary.
     * 
     * @param day the itinerary day to add
     */
    public void addDay(ItineraryDay day) {
        if (day != null) {
            if (this.days == null) this.days = new java.util.ArrayList<>();
            this.days.add(day);
        }
    }

    // [ Lifecycle Methods ] ==========================================

    public void plan() {
        this.changeStatusTo(ItineraryStatus.PLANNED);
    }

    public void start() {
        this.changeStatusTo(ItineraryStatus.ONGOING);
    }

    public void complete() {
        this.changeStatusTo(ItineraryStatus.COMPLETED);
    }

    private void changeStatusTo(ItineraryStatus newStatus) {
        if (!this.status.canTransitionTo(newStatus)) {
            throw new IllegalStateException(
                String.format("Cannot transition from %s to %s", this.status, newStatus)
            );
        }

        this.status = newStatus;
    }

    // [Getters and Setters] ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public long getUpdatedCount() {
        return updatedCount;
    }

    public void setUpdatedCount(long updatedCount) {
        this.updatedCount = updatedCount;
    }

    public ItineraryStatus getStatus() {
        return status;
    }

    public void setStatus(ItineraryStatus status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<ItineraryDay> getDays() {
        return days;
    }

    public void setDays(List<ItineraryDay> days) {
        this.days = days;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}

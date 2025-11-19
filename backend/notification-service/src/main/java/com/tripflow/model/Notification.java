package com.tripflow.model;

import java.time.Instant;

import jakarta.persistence.*;

@Entity
public class Notification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private boolean success;

    @Column(nullable = false, updatable = false)
    private Instant timestamp;

    @PrePersist
    protected void onCreate() {
        if (timestamp == null) {
            timestamp = Instant.now();
        }
    }

    // [Constructors] =================================================

    public Notification() {}

    public Notification(String username, String message, boolean success) {
        this.username = username;
        this.message = message;
        this.success = success;
    }

    public Notification(String username, String message, Instant timestamp, boolean success) {
        this.username = username;
        this.message = message;
        this.timestamp = timestamp;
        this.success = success;
    }

    // [Getters and Setters] ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public boolean getSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}

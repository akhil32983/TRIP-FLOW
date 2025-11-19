package com.tripflow.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
public class AILog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = true)
    private String destination;

    @Column(nullable = true)
    private String style;

    @Column(nullable = true)
    private Double budget;

    @Column(nullable = true)
    private String lodging;

    @Column(nullable = true)
    private String duration;

    @ElementCollection
    @Column(nullable = false)
    private List<String> interests;

    @Lob
    @Column(nullable = true, columnDefinition = "TEXT")
    private String response;

    @Column(nullable = false)
    private Boolean success = false;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    // [Constructors] =================================================

    public AILog() {}

    public AILog(
        String username, String destination, String style, Double budget,
        String lodging, String duration, List<String> interests, String response, Boolean success
    ) {
        this.username = username;
        this.destination = destination;
        this.style = style;
        this.budget = budget;
        this.lodging = lodging;
        this.duration = duration;
        this.interests = interests != null ? interests : new ArrayList<>();
        this.response = response;
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

    public String getDestination() { 
        return destination; 
    }
    
    public void setDestination(String destination) { 
        this.destination = destination; 
    }

    public String getStyle() { 
        return style; 
    }
    
    public void setStyle(String style) { 
        this.style = style; 
    }

    public Double getBudget() { 
        return budget; 
    }
    
    public void setBudget(Double budget) { 
        this.budget = budget; 
    }

    public String getLodging() { 
        return lodging; 
    }
    
    public void setLodging(String lodging) { 
        this.lodging = lodging; 
    }

    public String getDuration() { 
        return duration; 
    }
    
    public void setDuration(String duration) { 
        this.duration = duration; 
    }

    public List<String> getInterests() { 
        return interests; 
    }
    
    public void setInterests(List<String> interests) { 
        this.interests = interests != null ? interests : new ArrayList<>(); 
    }

    public String getResponse() { 
        return response; 
    }
    
    public void setResponse(String response) { 
        this.response = response; 
    }

    public Boolean getSuccess() { 
        return success; 
    }
    
    public void setSuccess(Boolean success) { 
        this.success = success; 
    }

    public LocalDateTime getCreatedAt() { 
        return createdAt; 
    }
    
    public void setCreatedAt(LocalDateTime createdAt) { 
        this.createdAt = createdAt; 
    }
}

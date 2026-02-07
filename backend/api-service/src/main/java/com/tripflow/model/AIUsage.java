package com.tripflow.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "ai_usage",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "date"})
    }
)
public class AIUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private int usage;

    // [Constructors] =================================================

    public AIUsage() {}

    public AIUsage(User user, LocalDate date, int usage) {
        this.user = user;
        this.date = date;
        this.usage = usage;
    }

    // [Methods] ======================================================

    public void increment() {
        this.usage++;
    }

    public void decrement() {
        this.usage = Math.max(this.usage - 1, 0);
    }

    // [Getters and Setters] ==========================================

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public LocalDate getDate() {
        return date;
    }

    public int getUsage() {
        return usage;
    }

    public void setUsage(int usage) {
        this.usage = usage;
    }
}

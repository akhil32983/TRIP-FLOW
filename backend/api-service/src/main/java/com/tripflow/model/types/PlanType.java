package com.tripflow.model.types;

public enum PlanType {
    FREE(10),
    PRO(50),
    PREMIUM(-1);

    private final int dailyLimit;

    PlanType(int dailyLimit) {
        this.dailyLimit = dailyLimit;
    }

    public int getDailyLimit() {
        return this.dailyLimit;
    }
}

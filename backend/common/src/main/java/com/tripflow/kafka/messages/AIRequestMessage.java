package com.tripflow.kafka.messages;

public class AIRequestMessage {
    private Long userId;
    private String prompt;

    // [Constructors] =================================================

    public AIRequestMessage() {}

    public AIRequestMessage(Long userId, String prompt) {
        this.userId = userId;
        this.prompt = prompt;
    }

    // [Methods] ======================================================

    public static boolean isValid(AIRequestMessage message) {
        if (message == null) return false;
        if (message.getUserId() == null || message.getUserId() <= 0) return false;
        if (message.getPrompt() == null || message.getPrompt().isEmpty()) return false;
        return true;
    }

    // [Getters and Setters] ==========================================

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }
}
package com.tripflow.service;

import org.springframework.stereotype.Service;

import com.tripflow.kafka.messages.AIRequestMessage;
import com.tripflow.model.AILog;
import com.tripflow.repository.AILogRepository;

@Service
public class AILogService {
    private final AILogRepository aiLogRepository;

    public AILogService(AILogRepository aiLogRepository) {
        this.aiLogRepository = aiLogRepository;
    }

    public void saveAILog(AIRequestMessage aiRequestMessage, String response, Boolean success) {
        AILog aiLog = this.createAILog(aiRequestMessage, response, success);
        this.aiLogRepository.save(aiLog);
    }

    private AILog createAILog(AIRequestMessage aiRequestMessage, String response, Boolean success) {
        return new AILog(
            aiRequestMessage.username(),
            aiRequestMessage.request().destination(),
            aiRequestMessage.request().style(),
            aiRequestMessage.request().budget(),
            aiRequestMessage.request().lodging(),
            aiRequestMessage.request().duration(),
            aiRequestMessage.request().interests(),
            response,
            success,
            aiRequestMessage.timestamp()
        );
    }
}

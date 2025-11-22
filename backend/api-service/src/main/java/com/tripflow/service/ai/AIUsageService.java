package com.tripflow.service.ai;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.tripflow.dto.AIMapper;
import com.tripflow.dto.ai.AIUsageDTO;
import com.tripflow.model.AIUsage;
import com.tripflow.model.User;
import com.tripflow.model.types.PlanType;
import com.tripflow.repository.AIUsageRepository;

@Service
public class AIUsageService {
    private final AIUsageRepository aiUsageRepository;
    private final AIMapper aiMapper;

    public AIUsageService(AIUsageRepository aiUsageRepository, AIMapper aiMapper) {
        this.aiUsageRepository = aiUsageRepository;
        this.aiMapper = aiMapper;
    }

    /**
     * Records an AI usage for the given user for today.
     * 
     * If an entry for today exists, increments the usage count.
     * Otherwise, creates a new entry with usage count set to 1.
     * 
     * @param user The user for whom to record the AI usage.
     */
    public AIUsageDTO recordUsage(User user) {
        LocalDate today = LocalDate.now();
        Optional<AIUsage> op = this.aiUsageRepository.findByUserAndDate(user, today);

        AIUsage usage;

        if (op.isPresent()) {
            usage = op.get();
            usage.increment();
        } else {
            usage = new AIUsage(user, today, 1);
        }

        return this.aiMapper.toDTO(this.aiUsageRepository.save(usage));
    }

    /**
     * Checks if the user can use AI services based on their daily limit.
     * 
     * @param user The user to check.
     * @return true if the user can use AI services, false otherwise.
     */
    public boolean canUseAI(User user) {
        if (user.getPlan().equals(PlanType.PREMIUM)) {
            return true;
        }

        LocalDate today = LocalDate.now();
        Optional<AIUsage> op = this.aiUsageRepository.findByUserAndDate(user, today);

        if (op.isPresent()) {
            AIUsage usage = op.get();
            return usage.getUsage() < user.getPlan().getDailyLimit();
        } else {
            return true;
        }
    }
}

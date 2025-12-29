package com.tripflow.service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.tripflow.model.User;
import com.tripflow.repository.UserRepository;

import jakarta.annotation.PostConstruct;

@Service
public class UserCleanupService {
    private final Logger log = LoggerFactory.getLogger(UserCleanupService.class);
    private final UserRepository userRepository;

    public UserCleanupService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Runs every day at midnight (00:00:00) to clean up unverified accounts
     * that were created more than 3 days ago.
     * 
     * Also runs on application startup for verification.
     */
    @PostConstruct
    @Scheduled(cron = "0 0 0 * * ?")
    public void cleanupUnverifiedUsers() {
        log.info("Starting cleanup of unverified users...");
        
        LocalDateTime expirationTime = LocalDateTime.now().minusDays(3);
        List<User> expiredUsers = userRepository.findByVerifiedFalseAndCreatedAtBefore(expirationTime);
        
        if (!expiredUsers.isEmpty()) {
            log.info("Found {} unverified users to delete", expiredUsers.size());
            userRepository.deleteAll(expiredUsers);
            log.info("Successfully deleted {} unverified users", expiredUsers.size());
        } else {
            log.info("No unverified users found to delete");
        }
    }
}

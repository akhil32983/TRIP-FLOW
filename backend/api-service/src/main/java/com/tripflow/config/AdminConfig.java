package com.tripflow.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.tripflow.dto.user.RegisterUserRequest;
import com.tripflow.model.types.UserType;
import com.tripflow.service.UserService;

import jakarta.annotation.PostConstruct;

@Component
public class AdminConfig {
    private final UserService userService;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    public AdminConfig(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void createAdminUserIfNotExists() {
        try {
            this.userService.getUserByUsername(adminUsername);
        } catch (Exception e) {
            this.userService.registerUser(
                new RegisterUserRequest(adminUsername, adminPassword, adminPassword),
                UserType.ADMIN
            );
        }
    }
}

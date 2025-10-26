package com.tripflow.controller.v1;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.tripflow.dto.stats.UserStatsDTO;
import com.tripflow.service.StatsService;

@RestController
@RequestMapping("/api/v1/stats")
public class RestStatsController {
    private final StatsService statsService;

    public RestStatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("/user")
    public ResponseEntity<UserStatsDTO> getUserStats() {
        try {
            UserStatsDTO stats = this.statsService.getUserStats();
            return ResponseEntity.ok(stats);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(null);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
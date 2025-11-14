package com.tripflow.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/health")
@Tag(name = "Health Check", description = "Endpoint for checking the health status of the application")
public class HealthController {

    @GetMapping({"", "/"})
    @Operation(
        summary = "Health Check Endpoint",
        description = "Returns the health status of the application."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Application is healthy")
    })
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "OK"));
    }
}
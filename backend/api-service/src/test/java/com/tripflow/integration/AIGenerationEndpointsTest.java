package com.tripflow.integration;

import com.tripflow.dto.ai.AIGenerationRequest;
import com.tripflow.integration.utils.AuthTestUtils;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.hamcrest.Matchers.*;

@Tag("integration")
public class AIGenerationEndpointsTest extends BaseIntegrationTest {

    @Test
    @DisplayName("Test get AI status successfully")
    public void testGetAIStatus() {
        String username = AuthTestUtils.generateUniqueValue("User");
        String token = AuthTestUtils.authenticateUserAndGetToken(username, false);

        RestAssured
            .given()
                .cookie("auth_token", token)
            .when()
                .get("/v1/ai/status")
            .then()
                .statusCode(200)
                .body("dailyLimit", notNullValue())
                .body("remainingRequests", notNullValue())
                .body("canUseAI", notNullValue())
                .body("isProcessing", notNullValue());
    }

    @Test
    @DisplayName("Test get AI status unauthenticated")
    public void testGetAIStatusUnauthenticated() {
        RestAssured
            .given()
            .when()
                .get("/v1/ai/status")
            .then()
                .statusCode(401);
    }

    @Test
    @DisplayName("Test submit AI request successfully")
    public void testSubmitAIRequest() {
        String username = AuthTestUtils.generateUniqueValue("User");
        String token = AuthTestUtils.authenticateUserAndGetToken(username, false);

        AIGenerationRequest request = new AIGenerationRequest(
            "Create a 3 day itinerary for Rome", 
            "Rome", 
            "Culture", 
            1000.0, 
            "Hotel", 
            "3 days",
            List.of("History", "Food")
        );

        RestAssured
            .given()
                .contentType(ContentType.JSON)
                .cookie("auth_token", token)
                .body(request)
            .when()
                .post("/v1/ai")
            .then()
                .statusCode(200)
                .body("message", equalTo("AI request submitted successfully"))
                .body("aiUsage", notNullValue());
    }
}

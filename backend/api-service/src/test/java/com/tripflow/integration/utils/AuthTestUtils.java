package com.tripflow.integration.utils;

import com.tripflow.dto.auth.LoginRequest;
import com.tripflow.dto.user.RegisterUserRequest;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;

import static org.hamcrest.Matchers.*;

public class AuthTestUtils {

    /**
     * Registers and logs in a user, returning the authentication token.
     * 
     * @param username the username for the test user
     * @return the authentication token
     */
    public static String authenticateUserAndGetToken(String username) {
        return authenticateUserAndGetToken(username, true);
    }
    
    /**
     * Registers and logs in a user, returning the authentication token.
     * 
     * @param username the username for the test user
     * @param unique whether the username should be unique
     * @return the authentication token
     */
    public static String authenticateUserAndGetToken(String username, boolean unique) {
        String uniqueUsername = unique
            ? generateUniqueValue(username)
            : username;
            
        String uniqueEmail = unique
            ? generateUniqueEmail(uniqueUsername)
            : uniqueUsername + "@example.com";

        // Register user
        RegisterUserRequest registerRequest = new RegisterUserRequest(
            uniqueEmail,
            uniqueUsername,
            "Ab12345678",
            "Ab12345678"
        );

        RestAssured
        .given()
            .contentType(ContentType.JSON)
            .body(registerRequest)
        .when()
            .post("/auth/register")
        .then()
            .statusCode(201);

        // Login user
        LoginRequest loginRequest = new LoginRequest(uniqueUsername, "Ab12345678");
        
        Response loginResponse = RestAssured
        .given()
            .contentType(ContentType.JSON)
            .body(loginRequest)
        .when()
            .post("/auth/login")
        .then()
            .statusCode(200)
            .body("status", equalTo("SUCCESS"))
            .body("message", equalTo("Login successful"))
            .body("errors", nullValue())
            .body("user", notNullValue())
            .cookie("auth_token", notNullValue())
            .cookie("refresh_token", notNullValue())
            .extract()
            .response();

        return loginResponse.getCookie("auth_token");
    }

    /**
     * Registers and logs in a user with a generated unique username.
     * 
     * @param baseUsername the base username to use (will be made unique)
     * @return the authentication token
     */
    public static String authenticateUserAndGetToken(String baseUsername, long uniqueId) {
        String uniqueUsername = baseUsername + "_" + uniqueId;
        return authenticateUserAndGetToken(uniqueUsername);
    }

    /**
     * Generates a unique value by appending the current time in nanoseconds to the given prefix.
     *
     * @param prefix the prefix to use
     * @return the unique value
     */
    public static String generateUniqueValue(String prefix) {
        return prefix + System.nanoTime();
    }
    
    /**
     * Generates a unique email by appending the current time in nanoseconds to the given prefix.
     *
     * @param prefix the prefix to use
     * @return the unique email
     */
    public static String generateUniqueEmail(String prefix) {
        return prefix + System.nanoTime() + "@example.com";
    }
}
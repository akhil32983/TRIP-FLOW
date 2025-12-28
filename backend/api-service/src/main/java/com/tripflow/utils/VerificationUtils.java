package com.tripflow.utils;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;

public class VerificationUtils {
    private VerificationUtils() {}

    /**
     * Generates a random verification code.
     * 
     * @return a random verification code
     */
    public static String generateVerificationCode() {
        return String.valueOf(100000 + new Random().nextInt(900000));
    }

    /**
     * Generates an expiration time for the verification code.
     * 
     * @return the expiration time for the verification code
     */
    public static Instant generateVerificationCodeExpiresAt() {
        return Instant.now().plus(15, ChronoUnit.MINUTES);
    }
}

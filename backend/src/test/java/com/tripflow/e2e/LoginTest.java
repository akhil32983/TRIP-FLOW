package com.tripflow.e2e;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;

@Tag("e2e")
public class LoginTest extends BaseE2ETest {

    @Test
    @DisplayName("User can access the login page")
    public void testAccessLoginPage() {
        navigateTo("/login");
        assertTrue(driver.getCurrentUrl().contains("/login"));
    }
}

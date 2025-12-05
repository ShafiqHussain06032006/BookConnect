package com.bookconnect;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Basic application context test.
 * Verifies that the Spring application context loads successfully.
 */
@SpringBootTest
@ActiveProfiles("test")
class BookConnectApplicationTests {

    @Test
    void contextLoads() {
        // Test passes if application context loads without errors
    }
}

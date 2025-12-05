package com.bookconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Main application entry point for BookConnect Backend.
 * 
 * Architecture Pattern: Spring Boot Application (Singleton pattern via Spring container)
 * This class bootstraps the entire Spring application context.
 */
@SpringBootApplication
@EnableJpaAuditing
public class BookConnectApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookConnectApplication.class, args);
    }
}

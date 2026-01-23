package com.bookconnect.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Home controller for health checks and root endpoint.
 */
@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
            "status", "running",
            "message", "BookConnect API is live! 🚀",
            "docs", "/api/books - Get all books"
        );
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "healthy");
    }
}

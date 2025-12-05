package com.bookconnect.exception;

/**
 * Custom exception for resource not found scenarios.
 * 
 * Design Pattern: Exception Hierarchy
 * Provides specific exception types for different error conditions.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s: '%s'", resourceName, fieldName, fieldValue));
    }
}

package com.bookconnect.exception;

/**
 * Custom exception for authentication failures.
 * 
 * Design Pattern: Exception Hierarchy
 */
public class AuthenticationException extends RuntimeException {

    public AuthenticationException(String message) {
        super(message);
    }
}

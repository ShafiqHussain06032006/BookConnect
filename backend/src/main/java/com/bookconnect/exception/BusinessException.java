package com.bookconnect.exception;

/**
 * Custom exception for business rule violations.
 * 
 * Design Pattern: Exception Hierarchy
 */
public class BusinessException extends RuntimeException {

    public BusinessException(String message) {
        super(message);
    }
}

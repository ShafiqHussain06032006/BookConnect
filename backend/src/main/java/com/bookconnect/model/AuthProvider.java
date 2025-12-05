package com.bookconnect.model;

/**
 * Enum for authentication provider types.
 * 
 * Design Pattern: Enumeration
 * Distinguishes between local email/password auth and OAuth providers.
 */
public enum AuthProvider {
    LOCAL,
    GOOGLE
}

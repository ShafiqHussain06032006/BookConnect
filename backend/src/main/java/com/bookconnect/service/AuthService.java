package com.bookconnect.service;

import com.bookconnect.dto.request.GoogleSignInRequest;
import com.bookconnect.dto.request.LoginRequest;
import com.bookconnect.dto.request.RegisterRequest;
import com.bookconnect.dto.response.AuthResponse;
import com.bookconnect.dto.response.UserResponse;
import com.bookconnect.model.User;

/**
 * Service interface for authentication operations.
 * 
 * Design Pattern: Service Layer Pattern + Dependency Inversion (Interface abstraction)
 * Defines contract for authentication business logic.
 */
public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse googleSignIn(GoogleSignInRequest request);

    UserResponse getCurrentUser(User user);
}

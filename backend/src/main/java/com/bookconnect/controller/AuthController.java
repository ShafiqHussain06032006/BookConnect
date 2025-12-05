package com.bookconnect.controller;

import com.bookconnect.dto.request.GoogleSignInRequest;
import com.bookconnect.dto.request.LoginRequest;
import com.bookconnect.dto.request.RegisterRequest;
import com.bookconnect.dto.response.ApiResponse;
import com.bookconnect.dto.response.AuthResponse;
import com.bookconnect.dto.response.UserResponse;
import com.bookconnect.model.User;
import com.bookconnect.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for authentication endpoints.
 * 
 * Design Pattern: MVC Controller (presentation layer)
 * Handles HTTP requests for user registration, login, and Google OAuth.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Registration successful", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/google")
    public ResponseEntity<ApiResponse<AuthResponse>> googleSignIn(@RequestBody GoogleSignInRequest request) {
        AuthResponse response = authService.googleSignIn(request);
        return ResponseEntity.ok(ApiResponse.success("Google sign-in successful", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(@AuthenticationPrincipal User user) {
        UserResponse response = authService.getCurrentUser(user);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}

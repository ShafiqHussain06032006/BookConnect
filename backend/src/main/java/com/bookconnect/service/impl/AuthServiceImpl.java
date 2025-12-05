package com.bookconnect.service.impl;

import com.bookconnect.dto.request.GoogleSignInRequest;
import com.bookconnect.dto.request.LoginRequest;
import com.bookconnect.dto.request.RegisterRequest;
import com.bookconnect.dto.response.AuthResponse;
import com.bookconnect.dto.response.UserResponse;
import com.bookconnect.exception.AuthenticationException;
import com.bookconnect.exception.BusinessException;
import com.bookconnect.mapper.UserMapper;
import com.bookconnect.model.AuthProvider;
import com.bookconnect.model.Role;
import com.bookconnect.model.User;
import com.bookconnect.repository.UserRepository;
import com.bookconnect.security.JwtTokenProvider;
import com.bookconnect.service.AuthService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

/**
 * Implementation of AuthService.
 * 
 * Design Patterns:
 * - Service Layer: Encapsulates business logic
 * - Dependency Injection: Via constructor injection
 * - Transaction Management: @Transactional for data consistency
 */
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException("Email is already registered");
        }

        // Create new user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .provider(AuthProvider.LOCAL)
                .role(Role.USER)
                .enabled(true)
                .build();

        User savedUser = userRepository.save(user);

        // Generate JWT token
        String token = tokenProvider.generateToken(savedUser);

        return AuthResponse.builder()
                .token(token)
                .user(userMapper.toResponse(savedUser))
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = (User) authentication.getPrincipal();

        // Generate JWT token
        String token = tokenProvider.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .user(userMapper.toResponse(user))
                .build();
    }

    @Override
    @Transactional
    public AuthResponse googleSignIn(GoogleSignInRequest request) {
        try {
            // Verify Google ID token
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(),
                    GsonFactory.getDefaultInstance()
            )
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.getIdToken());
            if (idToken == null) {
                throw new AuthenticationException("Invalid Google ID token");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");

            // Check if user exists or create new one
            User user = userRepository.findByEmail(email)
                    .orElseGet(() -> {
                        User newUser = User.builder()
                                .name(name)
                                .email(email)
                                .provider(AuthProvider.GOOGLE)
                                .role(Role.USER)
                                .enabled(true)
                                .build();
                        return userRepository.save(newUser);
                    });

            // Generate JWT token
            String token = tokenProvider.generateToken(user);

            return AuthResponse.builder()
                    .token(token)
                    .user(userMapper.toResponse(user))
                    .build();
        } catch (Exception e) {
            throw new AuthenticationException("Google sign-in failed: " + e.getMessage());
        }
    }

    @Override
    public UserResponse getCurrentUser(User user) {
        return userMapper.toResponse(user);
    }
}

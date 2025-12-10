package com.bookconnect.dto.response;

import com.bookconnect.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * DTO for user information in responses.
 * 
 * Design Pattern: Data Transfer Object (DTO)
 * Excludes sensitive fields like password.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private UUID id;
    private String name;
    private String email;
    private String phone;
    private String profilePicture;
    private String provider;
    private Role role;
}

package com.bookconnect.mapper;

import com.bookconnect.dto.response.UserResponse;
import com.bookconnect.model.User;
import org.springframework.stereotype.Component;

/**
 * Mapper for User entity to UserResponse DTO.
 * 
 * Design Pattern: Factory/Mapper Pattern
 * Centralizes conversion logic between domain models and DTOs.
 */
@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        if (user == null) {
            return null;
        }

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .provider(user.getProvider().name())
                .role(user.getRole())
                .build();
    }
}

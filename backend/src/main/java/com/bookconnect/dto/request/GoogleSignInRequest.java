package com.bookconnect.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for Google OAuth sign-in request.
 * 
 * Design Pattern: Data Transfer Object (DTO)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoogleSignInRequest {

    private String idToken;
}

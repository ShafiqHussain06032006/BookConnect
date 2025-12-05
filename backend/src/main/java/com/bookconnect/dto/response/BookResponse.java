package com.bookconnect.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for book information in responses.
 * 
 * Design Pattern: Data Transfer Object (DTO)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookResponse {

    private UUID id;
    private String title;
    private String author;
    private String description;
    private String category;
    private String type;
    private BigDecimal price;
    private String imageUrl;
    private String isbn;
    private String language;
    private Integer pages;
    private UUID uploaderId;
    private String uploaderName;
    private boolean available;
    private LocalDateTime createdAt;
}

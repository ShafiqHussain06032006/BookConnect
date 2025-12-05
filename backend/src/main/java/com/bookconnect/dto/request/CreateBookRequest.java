package com.bookconnect.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO for creating a book (multipart form data).
 * 
 * Design Pattern: Data Transfer Object (DTO)
 * Note: Image file will be handled separately as MultipartFile in controller.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateBookRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    private String title;

    @NotBlank(message = "Author is required")
    @Size(max = 255, message = "Author must not exceed 255 characters")
    private String author;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Category is required")
    private String category; // Will be converted to BookCategory enum

    @NotBlank(message = "Type is required")
    private String type; // FREE or PAID

    @Positive(message = "Price must be positive")
    private BigDecimal price;

    private String isbn;

    private String language;

    private Integer pages;
}

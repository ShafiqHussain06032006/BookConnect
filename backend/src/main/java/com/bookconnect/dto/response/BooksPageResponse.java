package com.bookconnect.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO for paginated book list responses.
 * 
 * Design Pattern: Data Transfer Object (DTO)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BooksPageResponse {

    private List<BookResponse> books;
    private int currentPage;
    private int totalPages;
    private long totalItems;
}

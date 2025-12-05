package com.bookconnect.mapper;

import com.bookconnect.dto.response.BookResponse;
import com.bookconnect.model.Book;
import org.springframework.stereotype.Component;

/**
 * Mapper for Book entity to BookResponse DTO.
 * 
 * Design Pattern: Factory/Mapper Pattern
 * Handles entity-to-DTO conversion with safe navigation for lazy-loaded fields.
 */
@Component
public class BookMapper {

    public BookResponse toResponse(Book book) {
        if (book == null) {
            return null;
        }

        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .description(book.getDescription())
                .category(book.getCategory().getDisplayName())
                .type(book.getType().name())
                .price(book.getPrice())
                .imageUrl(book.getImageUrl())
                .isbn(book.getIsbn())
                .language(book.getLanguage())
                .pages(book.getPages())
                .uploaderId(book.getUploader().getId())
                .uploaderName(book.getUploader().getName())
                .available(book.isAvailable())
                .createdAt(book.getCreatedAt())
                .build();
    }
}

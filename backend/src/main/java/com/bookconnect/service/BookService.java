package com.bookconnect.service;

import com.bookconnect.dto.request.CreateBookRequest;
import com.bookconnect.dto.response.BookResponse;
import com.bookconnect.dto.response.BooksPageResponse;
import com.bookconnect.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

/**
 * Service interface for book operations.
 * 
 * Design Pattern: Service Layer Pattern + Dependency Inversion
 */
public interface BookService {

    BookResponse createBook(CreateBookRequest request, MultipartFile image, User uploader);

    BookResponse getBookById(UUID id);

    BooksPageResponse getAllBooks(String search, String category, int page, int size);

    void borrowBook(UUID bookId, User user);

    void buyBook(UUID bookId, User user);
}

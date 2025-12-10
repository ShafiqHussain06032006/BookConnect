package com.bookconnect.service;

import com.bookconnect.dto.request.BorrowBuyRequest;
import com.bookconnect.dto.request.CreateBookRequest;
import com.bookconnect.dto.request.UpdateBookRequest;
import com.bookconnect.dto.response.BookResponse;
import com.bookconnect.dto.response.BooksPageResponse;
import com.bookconnect.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
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

    void borrowBook(UUID bookId, BorrowBuyRequest request, User user);

    void buyBook(UUID bookId, BorrowBuyRequest request, User user);

    // New methods for book management
    BookResponse updateBook(UUID bookId, UpdateBookRequest request, MultipartFile image, User user);

    void deleteBook(UUID bookId, User user);

    List<BookResponse> getBooksByUploader(User uploader);
}

package com.bookconnect.controller;

import com.bookconnect.dto.request.BorrowBuyRequest;
import com.bookconnect.dto.request.CreateBookRequest;
import com.bookconnect.dto.request.UpdateBookRequest;
import com.bookconnect.dto.response.ApiResponse;
import com.bookconnect.dto.response.BookResponse;
import com.bookconnect.dto.response.BooksPageResponse;
import com.bookconnect.model.BookCategory;
import com.bookconnect.model.User;
import com.bookconnect.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * REST Controller for book-related endpoints.
 * 
 * Design Pattern: MVC Controller
 * Handles all book operations (CRUD, search, borrow, buy).
 */
@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<ApiResponse<BookResponse>> createBook(
            @Valid @ModelAttribute CreateBookRequest request,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal User user) {

        BookResponse response = bookService.createBook(request, image, user);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Book uploaded successfully", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<BooksPageResponse>> getAllBooks(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        BooksPageResponse response = bookService.getAllBooks(q, category, page, size);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookResponse>> getBookById(@PathVariable UUID id) {
        BookResponse response = bookService.getBookById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/{id}/borrow")
    public ResponseEntity<ApiResponse<String>> borrowBook(
            @PathVariable UUID id,
            @Valid @RequestBody BorrowBuyRequest request,
            @AuthenticationPrincipal User user) {

        bookService.borrowBook(id, request, user);
        return ResponseEntity.ok(ApiResponse.success("Borrow request submitted successfully", null));
    }

    @PostMapping("/{id}/buy")
    public ResponseEntity<ApiResponse<String>> buyBook(
            @PathVariable UUID id,
            @Valid @RequestBody BorrowBuyRequest request,
            @AuthenticationPrincipal User user) {

        bookService.buyBook(id, request, user);
        return ResponseEntity.ok(ApiResponse.success("Purchase request submitted successfully", null));
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<ApiResponse<BookResponse>> updateBook(
            @PathVariable UUID id,
            @Valid @ModelAttribute UpdateBookRequest request,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal User user) {

        BookResponse response = bookService.updateBook(id, request, image, user);
        return ResponseEntity.ok(ApiResponse.success("Book updated successfully", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBook(
            @PathVariable UUID id,
            @AuthenticationPrincipal User user) {

        bookService.deleteBook(id, user);
        return ResponseEntity.ok(ApiResponse.success("Book deleted successfully", null));
    }

    @GetMapping("/my-books")
    public ResponseEntity<ApiResponse<List<BookResponse>>> getMyBooks(
            @AuthenticationPrincipal User user) {

        List<BookResponse> books = bookService.getBooksByUploader(user);
        return ResponseEntity.ok(ApiResponse.success(books));
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<String>>> getCategories() {
        List<String> categories = Arrays.stream(BookCategory.values())
                .map(BookCategory::getDisplayName)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(categories));
    }
}

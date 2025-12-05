package com.bookconnect.service.impl;

import com.bookconnect.dto.request.CreateBookRequest;
import com.bookconnect.dto.response.BookResponse;
import com.bookconnect.dto.response.BooksPageResponse;
import com.bookconnect.exception.BusinessException;
import com.bookconnect.exception.ResourceNotFoundException;
import com.bookconnect.mapper.BookMapper;
import com.bookconnect.model.*;
import com.bookconnect.repository.BookRepository;
import com.bookconnect.repository.BorrowRepository;
import com.bookconnect.repository.PurchaseRepository;
import com.bookconnect.service.BookService;
import com.bookconnect.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Implementation of BookService.
 * 
 * Design Patterns:
 * - Service Layer: Business logic encapsulation
 * - Strategy Pattern: Uses FileStorageService for flexible file handling
 * - Command Pattern: borrowBook/buyBook represent user actions
 */
@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final BorrowRepository borrowRepository;
    private final PurchaseRepository purchaseRepository;
    private final FileStorageService fileStorageService;
    private final BookMapper bookMapper;

    @Override
    @Transactional
    public BookResponse createBook(CreateBookRequest request, MultipartFile image, User uploader) {
        // Validate book type and price
        BookType bookType = BookType.valueOf(request.getType().toUpperCase());
        if (bookType == BookType.PAID && (request.getPrice() == null || request.getPrice().signum() <= 0)) {
            throw new BusinessException("Price is required for paid books");
        }

        // Upload image if provided
        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = fileStorageService.storeFile(image, "books");
        }

        // Create book entity
        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .description(request.getDescription())
                .category(BookCategory.fromDisplayName(request.getCategory()))
                .type(bookType)
                .price(request.getPrice())
                .imageUrl(imageUrl)
                .isbn(request.getIsbn())
                .language(request.getLanguage())
                .pages(request.getPages())
                .uploader(uploader)
                .available(true)
                .build();

        Book savedBook = bookRepository.save(book);
        return bookMapper.toResponse(savedBook);
    }

    @Override
    public BookResponse getBookById(UUID id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));
        return bookMapper.toResponse(book);
    }

    @Override
    public BooksPageResponse getAllBooks(String search, String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Book> bookPage;

        if (search != null && !search.isEmpty() && category != null && !category.isEmpty() && !category.equalsIgnoreCase("All")) {
            BookCategory bookCategory = BookCategory.fromDisplayName(category);
            bookPage = bookRepository.searchBooksByCategory(search, bookCategory, pageable);
        } else if (search != null && !search.isEmpty()) {
            bookPage = bookRepository.searchBooks(search, pageable);
        } else if (category != null && !category.isEmpty() && !category.equalsIgnoreCase("All")) {
            BookCategory bookCategory = BookCategory.fromDisplayName(category);
            bookPage = bookRepository.findByCategory(bookCategory, pageable);
        } else {
            bookPage = bookRepository.findAll(pageable);
        }

        List<BookResponse> books = bookPage.getContent()
                .stream()
                .map(bookMapper::toResponse)
                .collect(Collectors.toList());

        return BooksPageResponse.builder()
                .books(books)
                .currentPage(bookPage.getNumber())
                .totalPages(bookPage.getTotalPages())
                .totalItems(bookPage.getTotalElements())
                .build();
    }

    @Override
    @Transactional
    public void borrowBook(UUID bookId, User user) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", bookId));

        if (book.getType() != BookType.FREE) {
            throw new BusinessException("Only free books can be borrowed");
        }

        if (!book.isAvailable()) {
            throw new BusinessException("Book is currently not available");
        }

        // Create borrow record
        Borrow borrow = Borrow.builder()
                .book(book)
                .user(user)
                .build();

        borrowRepository.save(borrow);
    }

    @Override
    @Transactional
    public void buyBook(UUID bookId, User user) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", bookId));

        if (book.getType() != BookType.PAID) {
            throw new BusinessException("Only paid books can be purchased");
        }

        if (book.getPrice() == null) {
            throw new BusinessException("Book price is not set");
        }

        // Create purchase record (simplified - no payment integration yet)
        Purchase purchase = Purchase.builder()
                .book(book)
                .user(user)
                .amount(book.getPrice())
                .status("COMPLETED")
                .build();

        purchaseRepository.save(purchase);
    }
}

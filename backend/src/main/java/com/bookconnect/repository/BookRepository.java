package com.bookconnect.repository;

import com.bookconnect.model.Book;
import com.bookconnect.model.BookCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Book repository using Spring Data JPA.
 * 
 * Design Pattern: Repository Pattern
 * Provides data access methods for Book entities with custom search queries.
 */
@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {

    @Override
    @EntityGraph(attributePaths = "uploader")
    Page<Book> findAll(Pageable pageable);

    @EntityGraph(attributePaths = "uploader")
    Page<Book> findByCategory(BookCategory category, Pageable pageable);

    @EntityGraph(attributePaths = "uploader")
    @Query("SELECT b FROM Book b WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Book> searchBooks(@Param("search") String search, Pageable pageable);

    @EntityGraph(attributePaths = "uploader")
    @Query("SELECT b FROM Book b WHERE b.category = :category AND " +
           "(LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Book> searchBooksByCategory(@Param("search") String search,
                                       @Param("category") BookCategory category,
                                       Pageable pageable);
}

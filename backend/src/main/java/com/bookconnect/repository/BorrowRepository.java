package com.bookconnect.repository;

import com.bookconnect.model.Book;
import com.bookconnect.model.Borrow;
import com.bookconnect.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Borrow repository using Spring Data JPA.
 * 
 * Design Pattern: Repository Pattern
 * Manages borrow transactions.
 */
@Repository
public interface BorrowRepository extends JpaRepository<Borrow, UUID> {

    @EntityGraph(attributePaths = {"book", "book.uploader", "user"})
    List<Borrow> findByUser(User user);

    @EntityGraph(attributePaths = {"book", "book.uploader", "user"})
    List<Borrow> findByUserAndReturnedAtIsNull(User user);

    // Find borrow requests sent by a user (user is the borrower)
    @EntityGraph(attributePaths = {"book", "book.uploader", "user"})
    @Query("SELECT b FROM Borrow b WHERE b.user = :user ORDER BY b.borrowedAt DESC")
    List<Borrow> findBorrowRequestsSentByUser(@Param("user") User user);

    // Find borrow requests received by a user (user is the book owner)
    @EntityGraph(attributePaths = {"book", "book.uploader", "user"})
    @Query("SELECT b FROM Borrow b WHERE b.book.uploader = :owner ORDER BY b.borrowedAt DESC")
    List<Borrow> findBorrowRequestsReceivedByOwner(@Param("owner") User owner);

    // Count borrow requests sent by user
    @Query("SELECT COUNT(b) FROM Borrow b WHERE b.user = :user")
    long countByUser(@Param("user") User user);

    // Count borrow requests received by owner
    @Query("SELECT COUNT(b) FROM Borrow b WHERE b.book.uploader = :owner")
    long countByBookUploader(@Param("owner") User owner);
}

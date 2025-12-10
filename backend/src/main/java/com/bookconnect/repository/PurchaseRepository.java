package com.bookconnect.repository;

import com.bookconnect.model.Purchase;
import com.bookconnect.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Purchase repository using Spring Data JPA.
 * 
 * Design Pattern: Repository Pattern
 * Manages purchase transactions.
 */
@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, UUID> {

    @EntityGraph(attributePaths = {"book", "book.uploader", "user"})
    List<Purchase> findByUser(User user);

    // Find purchase requests sent by a user (user is the buyer)
    @EntityGraph(attributePaths = {"book", "book.uploader", "user"})
    @Query("SELECT p FROM Purchase p WHERE p.user = :user ORDER BY p.purchasedAt DESC")
    List<Purchase> findPurchasesByUser(@Param("user") User user);

    // Find purchase requests received by a user (user is the book owner)
    @EntityGraph(attributePaths = {"book", "book.uploader", "user"})
    @Query("SELECT p FROM Purchase p WHERE p.book.uploader = :owner ORDER BY p.purchasedAt DESC")
    List<Purchase> findPurchasesReceivedByOwner(@Param("owner") User owner);

    // Count purchases made by user
    @Query("SELECT COUNT(p) FROM Purchase p WHERE p.user = :user")
    long countByUser(@Param("user") User user);

    // Count purchase requests received by owner
    @Query("SELECT COUNT(p) FROM Purchase p WHERE p.book.uploader = :owner")
    long countByBookUploader(@Param("owner") User owner);
}

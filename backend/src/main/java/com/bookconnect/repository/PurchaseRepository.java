package com.bookconnect.repository;

import com.bookconnect.model.Purchase;
import com.bookconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
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

    List<Purchase> findByUser(User user);
}

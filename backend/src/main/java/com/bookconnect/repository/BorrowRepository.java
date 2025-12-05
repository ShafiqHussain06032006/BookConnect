package com.bookconnect.repository;

import com.bookconnect.model.Borrow;
import com.bookconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
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

    List<Borrow> findByUser(User user);

    List<Borrow> findByUserAndReturnedAtIsNull(User user);
}

package com.bookconnect.repository;

import com.bookconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * User repository using Spring Data JPA.
 * 
 * Design Pattern: Repository Pattern
 * Abstracts data access logic for User entities.
 * Spring Data JPA auto-implements CRUD and custom query methods.
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}

package com.bookconnect.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Borrow entity representing book borrowing transactions.
 * 
 * Design Pattern: Entity (JPA)
 * Tracks when users borrow FREE books and when they return them.
 */
@Entity
@Table(name = "borrows", indexes = {
    @Index(name = "idx_borrow_user", columnList = "user_id"),
    @Index(name = "idx_borrow_book", columnList = "book_id")
})
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Borrow {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime borrowedAt;

    private LocalDateTime returnedAt;

    @Transient
    public boolean isReturned() {
        return returnedAt != null;
    }
}

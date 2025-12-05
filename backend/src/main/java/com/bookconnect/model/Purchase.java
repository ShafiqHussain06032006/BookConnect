package com.bookconnect.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Purchase entity representing book purchase transactions.
 * 
 * Design Pattern: Entity (JPA)
 * Tracks purchases of PAID books. Payment integration is not implemented yet;
 * this serves as a simple order record.
 */
@Entity
@Table(name = "purchases", indexes = {
    @Index(name = "idx_purchase_user", columnList = "user_id"),
    @Index(name = "idx_purchase_book", columnList = "book_id")
})
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    @Builder.Default
    private String status = "COMPLETED";

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime purchasedAt;
}

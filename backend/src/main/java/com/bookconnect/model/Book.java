package com.bookconnect.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Book entity representing books uploaded by users.
 * 
 * Design Patterns:
 * - Entity (JPA): Domain object with persistence
 * - Builder (Lombok): Fluent construction
 * - Auditing: Automatic timestamp tracking via @EntityListeners
 * 
 * Books can be either FREE (borrowable) or PAID (purchasable).
 */
@Entity
@Table(name = "books", indexes = {
    @Index(name = "idx_book_category", columnList = "category"),
    @Index(name = "idx_book_type", columnList = "type"),
    @Index(name = "idx_book_uploader", columnList = "uploader_id")
})
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookCategory category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookType type;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "image_url")
    private String imageUrl;

    private String isbn;

    private String language;

    private Integer pages;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploader_id", nullable = false)
    private User uploader;

    @Column(nullable = false)
    @Builder.Default
    private boolean available = true;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}

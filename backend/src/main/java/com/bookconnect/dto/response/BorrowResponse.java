package com.bookconnect.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for borrow request response.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BorrowResponse {

    private UUID id;
    
    // Book details
    private UUID bookId;
    private String bookTitle;
    private String bookAuthor;
    private String bookImageUrl;
    private String bookType;
    
    // Borrower details
    private UUID borrowerId;
    private String borrowerName;
    private String borrowerPhone;
    private String borrowerCity;
    private String borrowerAddress;
    private String borrowerEmail;
    private String messageToOwner;
    
    // Owner details
    private UUID ownerId;
    private String ownerName;
    private String ownerEmail;
    
    private String status;
    private LocalDateTime borrowedAt;
    private LocalDateTime returnedAt;
}

package com.bookconnect.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for purchase response.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseResponse {

    private UUID id;
    
    // Book details
    private UUID bookId;
    private String bookTitle;
    private String bookAuthor;
    private String bookImageUrl;
    
    // Buyer details
    private UUID buyerId;
    private String buyerName;
    private String buyerPhone;
    private String buyerCity;
    private String buyerAddress;
    private String buyerEmail;
    private String messageToOwner;
    
    // Owner details
    private UUID ownerId;
    private String ownerName;
    private String ownerEmail;
    
    private BigDecimal amount;
    private String status;
    private LocalDateTime purchasedAt;
}

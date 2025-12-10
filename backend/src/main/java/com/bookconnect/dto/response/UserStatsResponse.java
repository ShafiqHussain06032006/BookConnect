package com.bookconnect.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for user statistics response.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserStatsResponse {

    private long totalBooksUploaded;
    private long totalBorrowRequestsReceived;
    private long totalBorrowRequestsSent;
    private long totalPurchaseRequestsReceived;
    private long totalPurchasesMade;
}

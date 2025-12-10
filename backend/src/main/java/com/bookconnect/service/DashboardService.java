package com.bookconnect.service;

import com.bookconnect.dto.response.BorrowResponse;
import com.bookconnect.dto.response.PurchaseResponse;
import com.bookconnect.dto.response.UserStatsResponse;
import com.bookconnect.model.User;

import java.util.List;
import java.util.UUID;

/**
 * Service interface for dashboard operations.
 */
public interface DashboardService {

    UserStatsResponse getUserStats(User user);

    List<BorrowResponse> getBorrowRequestsSent(User user);

    List<BorrowResponse> getBorrowRequestsReceived(User user);

    List<PurchaseResponse> getPurchasesMade(User user);

    List<PurchaseResponse> getPurchaseRequestsReceived(User user);

    void deleteBorrowRequest(UUID borrowId, User user);

    void deletePurchaseRequest(UUID purchaseId, User user);
}

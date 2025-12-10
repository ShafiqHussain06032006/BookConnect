package com.bookconnect.controller;

import com.bookconnect.dto.response.ApiResponse;
import com.bookconnect.dto.response.BorrowResponse;
import com.bookconnect.dto.response.PurchaseResponse;
import com.bookconnect.dto.response.UserStatsResponse;
import com.bookconnect.model.User;
import com.bookconnect.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * REST Controller for dashboard and user statistics.
 */
@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<UserStatsResponse>> getUserStats(
            @AuthenticationPrincipal User user) {

        UserStatsResponse stats = dashboardService.getUserStats(user);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/borrow/sent")
    public ResponseEntity<ApiResponse<List<BorrowResponse>>> getBorrowRequestsSent(
            @AuthenticationPrincipal User user) {

        List<BorrowResponse> requests = dashboardService.getBorrowRequestsSent(user);
        return ResponseEntity.ok(ApiResponse.success(requests));
    }

    @GetMapping("/borrow/received")
    public ResponseEntity<ApiResponse<List<BorrowResponse>>> getBorrowRequestsReceived(
            @AuthenticationPrincipal User user) {

        List<BorrowResponse> requests = dashboardService.getBorrowRequestsReceived(user);
        return ResponseEntity.ok(ApiResponse.success(requests));
    }

    @DeleteMapping("/borrow/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBorrowRequest(
            @PathVariable UUID id,
            @AuthenticationPrincipal User user) {

        dashboardService.deleteBorrowRequest(id, user);
        return ResponseEntity.ok(ApiResponse.success("Borrow request deleted", null));
    }

    @GetMapping("/purchases")
    public ResponseEntity<ApiResponse<List<PurchaseResponse>>> getPurchasesMade(
            @AuthenticationPrincipal User user) {

        List<PurchaseResponse> purchases = dashboardService.getPurchasesMade(user);
        return ResponseEntity.ok(ApiResponse.success(purchases));
    }

    @GetMapping("/purchases/received")
    public ResponseEntity<ApiResponse<List<PurchaseResponse>>> getPurchaseRequestsReceived(
            @AuthenticationPrincipal User user) {

        List<PurchaseResponse> purchases = dashboardService.getPurchaseRequestsReceived(user);
        return ResponseEntity.ok(ApiResponse.success(purchases));
    }

    @DeleteMapping("/purchases/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePurchaseRequest(
            @PathVariable UUID id,
            @AuthenticationPrincipal User user) {

        dashboardService.deletePurchaseRequest(id, user);
        return ResponseEntity.ok(ApiResponse.success("Purchase request deleted", null));
    }
}

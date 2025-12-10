package com.bookconnect.service.impl;

import com.bookconnect.dto.response.BorrowResponse;
import com.bookconnect.dto.response.PurchaseResponse;
import com.bookconnect.dto.response.UserStatsResponse;
import com.bookconnect.exception.BusinessException;
import com.bookconnect.exception.ResourceNotFoundException;
import com.bookconnect.model.Borrow;
import com.bookconnect.model.Purchase;
import com.bookconnect.model.User;
import com.bookconnect.repository.BookRepository;
import com.bookconnect.repository.BorrowRepository;
import com.bookconnect.repository.PurchaseRepository;
import com.bookconnect.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Implementation of DashboardService.
 */
@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final BookRepository bookRepository;
    private final BorrowRepository borrowRepository;
    private final PurchaseRepository purchaseRepository;

    @Override
    public UserStatsResponse getUserStats(User user) {
        long booksUploaded = bookRepository.countByUploader(user);
        long borrowRequestsSent = borrowRepository.countByUser(user);
        long borrowRequestsReceived = borrowRepository.countByBookUploader(user);
        long purchasesMade = purchaseRepository.countByUser(user);
        long purchaseRequestsReceived = purchaseRepository.countByBookUploader(user);

        return UserStatsResponse.builder()
                .totalBooksUploaded(booksUploaded)
                .totalBorrowRequestsSent(borrowRequestsSent)
                .totalBorrowRequestsReceived(borrowRequestsReceived)
                .totalPurchasesMade(purchasesMade)
                .totalPurchaseRequestsReceived(purchaseRequestsReceived)
                .build();
    }

    @Override
    public List<BorrowResponse> getBorrowRequestsSent(User user) {
        List<Borrow> borrows = borrowRepository.findBorrowRequestsSentByUser(user);
        return borrows.stream()
                .map(this::mapBorrowToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BorrowResponse> getBorrowRequestsReceived(User user) {
        List<Borrow> borrows = borrowRepository.findBorrowRequestsReceivedByOwner(user);
        return borrows.stream()
                .map(this::mapBorrowToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PurchaseResponse> getPurchasesMade(User user) {
        List<Purchase> purchases = purchaseRepository.findPurchasesByUser(user);
        return purchases.stream()
                .map(this::mapPurchaseToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PurchaseResponse> getPurchaseRequestsReceived(User user) {
        List<Purchase> purchases = purchaseRepository.findPurchasesReceivedByOwner(user);
        return purchases.stream()
                .map(this::mapPurchaseToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteBorrowRequest(UUID borrowId, User user) {
        Borrow borrow = borrowRepository.findById(borrowId)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow request", "id", borrowId));

        // User can only delete their own borrow request
        if (!borrow.getUser().getId().equals(user.getId())) {
            throw new BusinessException("You can only delete your own borrow requests");
        }

        borrowRepository.delete(borrow);
    }

    @Override
    @Transactional
    public void deletePurchaseRequest(UUID purchaseId, User user) {
        Purchase purchase = purchaseRepository.findById(purchaseId)
                .orElseThrow(() -> new ResourceNotFoundException("Purchase request", "id", purchaseId));

        // User can only delete their own purchase request
        if (!purchase.getUser().getId().equals(user.getId())) {
            throw new BusinessException("You can only delete your own purchase requests");
        }

        purchaseRepository.delete(purchase);
    }

    private BorrowResponse mapBorrowToResponse(Borrow borrow) {
        return BorrowResponse.builder()
                .id(borrow.getId())
                .bookId(borrow.getBook().getId())
                .bookTitle(borrow.getBook().getTitle())
                .bookAuthor(borrow.getBook().getAuthor())
                .bookImageUrl(borrow.getBook().getImageUrl())
                .bookType(borrow.getBook().getType().name())
                .borrowerId(borrow.getUser().getId())
                .borrowerName(borrow.getBorrowerName())
                .borrowerPhone(borrow.getBorrowerPhone())
                .borrowerCity(borrow.getBorrowerCity())
                .borrowerAddress(borrow.getBorrowerAddress())
                .borrowerEmail(borrow.getUser().getEmail())
                .messageToOwner(borrow.getMessageToOwner())
                .ownerId(borrow.getBook().getUploader().getId())
                .ownerName(borrow.getBook().getUploader().getName())
                .ownerEmail(borrow.getBook().getUploader().getEmail())
                .status(borrow.getStatus().name())
                .borrowedAt(borrow.getBorrowedAt())
                .returnedAt(borrow.getReturnedAt())
                .build();
    }

    private PurchaseResponse mapPurchaseToResponse(Purchase purchase) {
        return PurchaseResponse.builder()
                .id(purchase.getId())
                .bookId(purchase.getBook().getId())
                .bookTitle(purchase.getBook().getTitle())
                .bookAuthor(purchase.getBook().getAuthor())
                .bookImageUrl(purchase.getBook().getImageUrl())
                .buyerId(purchase.getUser().getId())
                .buyerName(purchase.getBuyerName())
                .buyerPhone(purchase.getBuyerPhone())
                .buyerCity(purchase.getBuyerCity())
                .buyerAddress(purchase.getBuyerAddress())
                .buyerEmail(purchase.getUser().getEmail())
                .messageToOwner(purchase.getMessageToOwner())
                .ownerId(purchase.getBook().getUploader().getId())
                .ownerName(purchase.getBook().getUploader().getName())
                .ownerEmail(purchase.getBook().getUploader().getEmail())
                .amount(purchase.getAmount())
                .status(purchase.getStatus())
                .purchasedAt(purchase.getPurchasedAt())
                .build();
    }
}

package com.bookconnect.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * Service interface for file storage operations.
 * 
 * Design Pattern: Strategy Pattern
 * Allows swapping file storage implementations (filesystem, S3, etc.).
 */
public interface FileStorageService {

    String storeFile(MultipartFile file, String directory);

    void deleteFile(String fileUrl);

    String getFileUrl(String fileName);
}

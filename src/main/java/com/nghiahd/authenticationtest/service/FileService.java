package com.nghiahd.authenticationtest.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    public void save(MultipartFile file);
}

package com.nghiahd.authenticationtest.service.impl;

import com.nghiahd.authenticationtest.service.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    private final Path root = Paths.get("src/main/webapp/angular/src/assets/img/yte");

    @Override
    public String save(MultipartFile file) {
        try {
            String fileName=UUID.randomUUID().toString()+file.getOriginalFilename();
            Files.copy(file.getInputStream(), this.root.resolve(fileName));
            return fileName;

        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }
}

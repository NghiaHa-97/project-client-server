package com.nghiahd.authenticationtest.service;

import com.nghiahd.authenticationtest.domain.BacSi;
import com.nghiahd.authenticationtest.domain.BieuHien;
import com.nghiahd.authenticationtest.repository.DTO.BacSiDTO;
import com.nghiahd.authenticationtest.repository.DTO.ResultChuanDoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BacSiService {
    List<BacSi> getAllBacSi();
    BacSi findOne(Integer id);
    Page<BacSiDTO> getPage(Pageable pageable, String serach);
    Page<BieuHien> getPageBieuHien(Pageable pageable, String serach);
    BacSi save(BacSi bs);
    List<ResultChuanDoan> getChuanDoan(List<Integer> listId);
}

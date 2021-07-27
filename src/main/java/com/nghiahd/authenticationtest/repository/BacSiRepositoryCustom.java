package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.domain.BieuHien;
import com.nghiahd.authenticationtest.repository.DTO.BacSiDTO;
import com.nghiahd.authenticationtest.repository.DTO.GiangVienPhanCongDTO;
import com.nghiahd.authenticationtest.repository.DTO.ResultChuanDoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BacSiRepositoryCustom {
    Page<BacSiDTO> getPage(Pageable pageable, String search);
    Page<BieuHien> getPageBieuHien(Pageable pageable, String search);

    List<ResultChuanDoan> getChuanDoan(StringBuilder idToString);
}

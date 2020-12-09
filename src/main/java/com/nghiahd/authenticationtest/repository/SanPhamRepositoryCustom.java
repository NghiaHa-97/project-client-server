package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.repository.DTO.SanPhamDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SanPhamRepositoryCustom {
    Page<SanPhamDTO> getPageSanPham(Pageable pageable,String search);
    List<SanPhamDTO> getListSanPhamByListId(List<Integer> ids);

}

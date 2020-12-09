package com.nghiahd.authenticationtest.service.impl;

import com.nghiahd.authenticationtest.repository.DTO.SanPhamDTO;
import com.nghiahd.authenticationtest.repository.SanPhamRepository;
import com.nghiahd.authenticationtest.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SanPhamServiceImpl implements SanPhamService {

    @Autowired
    SanPhamRepository sanPhamRepository;

    @Override
    public Page<SanPhamDTO> getPageSanPham(Pageable pageable, String search) {
        return sanPhamRepository.getPageSanPham(pageable,search);
    }

    @Override
    public List<SanPhamDTO> getListSanPhamByListId(List<Integer> ids) {
        return sanPhamRepository.getListSanPhamByListId(ids);
    }


}

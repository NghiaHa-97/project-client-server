package com.nghiahd.authenticationtest.service.impl;


import com.nghiahd.authenticationtest.domain.LichKham;
import com.nghiahd.authenticationtest.repository.DangKyKhamRepository;
import com.nghiahd.authenticationtest.service.DangKyKhamService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DangKyKhamServiceImpl implements DangKyKhamService {

    private final DangKyKhamRepository dangKyKhamRepository;


    public DangKyKhamServiceImpl(DangKyKhamRepository dangKyKhamRepository) {
        this.dangKyKhamRepository = dangKyKhamRepository;
    }

    @Override
    public LichKham save(LichKham lichKham) {
        return this.dangKyKhamRepository.save(lichKham);
    }
}

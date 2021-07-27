package com.nghiahd.authenticationtest.service.impl;

import com.nghiahd.authenticationtest.domain.BacSi;
import com.nghiahd.authenticationtest.domain.Khoa;
import com.nghiahd.authenticationtest.repository.BacSiRepository;
import com.nghiahd.authenticationtest.repository.KhoaRepository;
import com.nghiahd.authenticationtest.service.KhoaService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class KhoaServiceImpl implements KhoaService {
    private final KhoaRepository khoaRepository;
    private final BacSiRepository bacSiRepository;

    public KhoaServiceImpl(KhoaRepository khoaRepository,
                           BacSiRepository bacSiRepository) {
        this.khoaRepository = khoaRepository;
        this.bacSiRepository = bacSiRepository;
    }

    @Override
    public List<Khoa> getlAllKhoa() {

//        BacSi bacSi=bacSiRepository.findById(1).get();
//        List<BacSi> b= bacSiRepository.getAllBacSi();
        return khoaRepository.getlAllKhoa();
    }
}

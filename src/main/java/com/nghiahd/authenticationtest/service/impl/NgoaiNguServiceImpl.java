package com.nghiahd.authenticationtest.service.impl;

import com.nghiahd.authenticationtest.domain.NgoaiNgu;
import com.nghiahd.authenticationtest.repository.NgoaiNguRepository;
import com.nghiahd.authenticationtest.service.NgoaiNguService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class NgoaiNguServiceImpl implements NgoaiNguService {

    private final NgoaiNguRepository ngoaiNguRepository;

    public NgoaiNguServiceImpl(NgoaiNguRepository ngoaiNguRepository) {
        this.ngoaiNguRepository = ngoaiNguRepository;
    }

    @Override
    public List<NgoaiNgu> getAllNN() {
        return ngoaiNguRepository.grtAllNN();
    }
}

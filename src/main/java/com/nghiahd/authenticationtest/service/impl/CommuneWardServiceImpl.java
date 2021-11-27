package com.nghiahd.authenticationtest.service.impl;

import com.nghiahd.authenticationtest.domain.CommuneWard;
import com.nghiahd.authenticationtest.repository.CommuneWardRepository;
import com.nghiahd.authenticationtest.service.CommuneWardService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommuneWardServiceImpl implements CommuneWardService {
    private final CommuneWardRepository communeWardRepository;

    public CommuneWardServiceImpl(CommuneWardRepository communeWardRepository) {
        this.communeWardRepository = communeWardRepository;
    }

    @Override
    public List<CommuneWard> getAllCommuneWard(int districtID) {
        return communeWardRepository.findByDistrictIDOrderByNameAsc(districtID);
    }
}

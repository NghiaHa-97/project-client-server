package com.nghiahd.authenticationtest.service.impl;

import com.nghiahd.authenticationtest.domain.District;
import com.nghiahd.authenticationtest.repository.DistrictRepository;
import com.nghiahd.authenticationtest.service.DistrictService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DistrictServiceImpl implements DistrictService {

    private final DistrictRepository districtRepository;

    public DistrictServiceImpl(DistrictRepository districtRepository) {
        this.districtRepository = districtRepository;
    }

    @Override
    public List<District> getAllDistrict(int cityProvinceID) {
        return districtRepository.findByCityProvinceIDOrderByNameAsc(cityProvinceID);
    }
}

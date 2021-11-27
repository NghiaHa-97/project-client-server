package com.nghiahd.authenticationtest.service.impl;

import com.nghiahd.authenticationtest.domain.CityProvince;
import com.nghiahd.authenticationtest.repository.CityProvinceRepository;
import com.nghiahd.authenticationtest.service.CityProvinceService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CityProvinceServiceImpl implements CityProvinceService {

    private final CityProvinceRepository cityProvinceRepository;

    public CityProvinceServiceImpl(CityProvinceRepository cityProvinceRepository) {
        this.cityProvinceRepository = cityProvinceRepository;
    }

    @Override
    public List<CityProvince> getAllCityProvince() {
        return cityProvinceRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }
}

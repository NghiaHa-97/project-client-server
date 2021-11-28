package com.nghiahd.authenticationtest.service;

import com.nghiahd.authenticationtest.domain.District;

import java.util.List;

public interface DistrictService {

    List<District> getAllDistrict(int cityProvinceID);

}

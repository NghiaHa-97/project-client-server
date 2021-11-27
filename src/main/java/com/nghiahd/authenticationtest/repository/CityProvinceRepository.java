package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.domain.CityProvince;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityProvinceRepository extends JpaRepository<CityProvince, Integer> {


}
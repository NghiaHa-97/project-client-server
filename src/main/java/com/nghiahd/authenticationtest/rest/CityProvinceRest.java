package com.nghiahd.authenticationtest.rest;

import com.nghiahd.authenticationtest.domain.CityProvince;
import com.nghiahd.authenticationtest.domain.District;
import com.nghiahd.authenticationtest.service.CityProvinceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/cityprovince")
public class CityProvinceRest {

    private final CityProvinceService cityProvinceService;

    public CityProvinceRest(CityProvinceService cityProvinceService) {
        this.cityProvinceService = cityProvinceService;
    }

    @GetMapping()
    public ResponseEntity<List<CityProvince>> getAllCityProvince() {
        return new ResponseEntity<>(cityProvinceService.getAllCityProvince(), HttpStatus.OK);
    }

}

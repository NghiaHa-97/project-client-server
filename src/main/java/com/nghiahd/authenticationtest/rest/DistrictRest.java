package com.nghiahd.authenticationtest.rest;


import com.nghiahd.authenticationtest.domain.District;
import com.nghiahd.authenticationtest.service.DistrictService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/district")
public class DistrictRest {
    private final DistrictService districtService;

    public DistrictRest(DistrictService districtService) {
        this.districtService = districtService;
    }

    @GetMapping("/{cityProvinceID}")
    public ResponseEntity<List<District>> getAllDistrict(@PathVariable() int cityProvinceID) {

        List<District> result= districtService.getAllDistrict(cityProvinceID);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}

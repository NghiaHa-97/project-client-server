package com.nghiahd.authenticationtest.rest;

import com.nghiahd.authenticationtest.domain.CommuneWard;
import com.nghiahd.authenticationtest.service.CommuneWardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/commune-ward")
public class CommuneWardRest {
    private final CommuneWardService communeWardService;

    public CommuneWardRest(CommuneWardService communeWardService) {
        this.communeWardService = communeWardService;
    }

    @GetMapping("/{districtID}")
    public ResponseEntity<List<CommuneWard>> getAllCommuneWard(@PathVariable() int districtID) {

        return new ResponseEntity<>(communeWardService.getAllCommuneWard(districtID), HttpStatus.OK);
    }


}

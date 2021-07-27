package com.nghiahd.authenticationtest.rest;


import com.nghiahd.authenticationtest.domain.Khoa;
import com.nghiahd.authenticationtest.domain.NgoaiNgu;
import com.nghiahd.authenticationtest.service.KhoaService;
import com.nghiahd.authenticationtest.service.NgoaiNguService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/nn")
public class NgoaiNguRest {
    private final NgoaiNguService ngoaiNguService;


    public NgoaiNguRest(NgoaiNguService ngoaiNguService) {
        this.ngoaiNguService = ngoaiNguService;
    }

    @GetMapping(value = "/get-all-nn")
    public List<NgoaiNgu> getAllNN(){
        List<NgoaiNgu> khoas=ngoaiNguService.getAllNN();
        return khoas;
    }
}

package com.nghiahd.authenticationtest.rest;


import com.nghiahd.authenticationtest.domain.Khoa;
import com.nghiahd.authenticationtest.domain.PermissionDetail;
import com.nghiahd.authenticationtest.service.KhoaService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/khoa")
public class KhoaRest {

    private final KhoaService khoaService;

    public KhoaRest(KhoaService khoaService) {
        this.khoaService = khoaService;
    }

    @GetMapping(value = "/get-all-khoa")
    public List<Khoa> getAllKhoa(){
        List<Khoa> khoas=khoaService.getlAllKhoa();
        return khoas;
    }
}

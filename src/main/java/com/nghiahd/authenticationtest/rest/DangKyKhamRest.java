package com.nghiahd.authenticationtest.rest;

import com.nghiahd.authenticationtest.domain.LichKham;
import com.nghiahd.authenticationtest.service.DangKyKhamService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/dang-ky-kham")
public class DangKyKhamRest {

    private final DangKyKhamService dangKyKhamService;

    public DangKyKhamRest(DangKyKhamService dangKyKhamService) {
        this.dangKyKhamService = dangKyKhamService;
    }

    @PostMapping(value = "/save")
    public LichKham saveDangKyKham(@RequestBody LichKham request){
        return dangKyKhamService.save(request);
    }

}

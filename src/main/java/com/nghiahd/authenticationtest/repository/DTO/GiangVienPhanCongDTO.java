package com.nghiahd.authenticationtest.repository.DTO;

import java.time.LocalDate;

public class GiangVienPhanCongDTO {
    private Integer id;

    private String maGV;

    private String hoTen;




    public GiangVienPhanCongDTO() {
    }

    public GiangVienPhanCongDTO(Integer id, String maGV, String hoTen) {
        this.id = id;
        this.maGV = maGV;
        this.hoTen = hoTen;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMaGV() {
        return maGV;
    }

    public void setMaGV(String maGV) {
        this.maGV = maGV;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

}

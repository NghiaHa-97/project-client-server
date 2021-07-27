package com.nghiahd.authenticationtest.repository.DTO;

public class DoTuoiSoTietDTO {
    private String tenNhom;
    private Integer soGiangVien;
    private Integer tongSoTiet;
    private Float soTietTb;

    public DoTuoiSoTietDTO(String tenNhom, Integer soGiangVien, Integer tongSoTiet, Float soTietTb) {
        this.tenNhom = tenNhom;
        this.soGiangVien = soGiangVien;
        this.tongSoTiet = tongSoTiet;
        this.soTietTb = soTietTb;
    }

    public String getTenNhom() {
        return tenNhom;
    }

    public void setTenNhom(String tenNhom) {
        this.tenNhom = tenNhom;
    }

    public Integer getSoGiangVien() {
        return soGiangVien;
    }

    public void setSoGiangVien(Integer soGiangVien) {
        this.soGiangVien = soGiangVien;
    }

    public Integer getTongSoTiet() {
        return tongSoTiet;
    }

    public void setTongSoTiet(Integer tongSoTiet) {
        this.tongSoTiet = tongSoTiet;
    }

    public Float getSoTietTb() {
        return soTietTb;
    }

    public void setSoTietTb(Float soTietTb) {
        this.soTietTb = soTietTb;
    }
}

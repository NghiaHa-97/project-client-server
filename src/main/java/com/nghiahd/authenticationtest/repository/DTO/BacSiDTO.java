package com.nghiahd.authenticationtest.repository.DTO;

import java.time.LocalDate;

public class BacSiDTO {
    private Integer id;
    private String maBS;
    private String hoTen;
    private String hocVi;
    private String chucVu;
    private String donViCongTac;
    private Integer khoaId;
    private String anh;
    private String gioiThieu;

    public BacSiDTO() {
    }

    public BacSiDTO(Integer id, String maBS, String hoTen, String hocVi, String chucVu, String donViCongTac, Integer khoaId, String anh, String gioiThieu) {
        this.id = id;
        this.maBS = maBS;
        this.hoTen = hoTen;
        this.hocVi = hocVi;
        this.chucVu = chucVu;
        this.donViCongTac = donViCongTac;
        this.khoaId = khoaId;
        this.anh = anh;
        this.gioiThieu = gioiThieu;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMaBS() {
        return maBS;
    }

    public void setMaBS(String maBS) {
        this.maBS = maBS;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public String getHocVi() {
        return hocVi;
    }

    public void setHocVi(String hocVi) {
        this.hocVi = hocVi;
    }

    public String getChucVu() {
        return chucVu;
    }

    public void setChucVu(String chucVu) {
        this.chucVu = chucVu;
    }

    public String getDonViCongTac() {
        return donViCongTac;
    }

    public void setDonViCongTac(String donViCongTac) {
        this.donViCongTac = donViCongTac;
    }

    public Integer getKhoaId() {
        return khoaId;
    }

    public void setKhoaId(Integer khoaId) {
        this.khoaId = khoaId;
    }

    public String getAnh() {
        return anh;
    }

    public void setAnh(String anh) {
        this.anh = anh;
    }

    public String getGioiThieu() {
        return gioiThieu;
    }

    public void setGioiThieu(String gioiThieu) {
        this.gioiThieu = gioiThieu;
    }
}

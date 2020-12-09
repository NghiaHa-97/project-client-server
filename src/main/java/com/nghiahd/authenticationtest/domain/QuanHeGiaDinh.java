package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;


@Entity
@Table(name = "quanhegiadinh")
public class QuanHeGiaDinh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "hoten")
    private String hoTen;

    @Column(name = "namsinh")
    private Integer namSinh;

    @Column(name = "quequan")
    private String queQuan;

    @Column(name = "nghenghiep")
    private String ngheNghiep;

    @Column(name = "noiohiennay")
    private String noiOHienNay;

    @Column(name = "donvicongtac")
    private String donViCongTac;

    @Column(name = "moiquanhe")
    private String moiQuanHe;

    @Column(name = "giangvienid")
    private Integer giangVienId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public Integer getNamSinh() {
        return namSinh;
    }

    public void setNamSinh(Integer namSinh) {
        this.namSinh = namSinh;
    }

    public String getQueQuan() {
        return queQuan;
    }

    public void setQueQuan(String queQuan) {
        this.queQuan = queQuan;
    }

    public String getNgheNghiep() {
        return ngheNghiep;
    }

    public void setNgheNghiep(String ngheNghiep) {
        this.ngheNghiep = ngheNghiep;
    }

    public String getNoiOHienNay() {
        return noiOHienNay;
    }

    public void setNoiOHienNay(String noiOHienNay) {
        this.noiOHienNay = noiOHienNay;
    }

    public String getDonViCongTac() {
        return donViCongTac;
    }

    public void setDonViCongTac(String donViCongTac) {
        this.donViCongTac = donViCongTac;
    }

    public String getMoiQuanHe() {
        return moiQuanHe;
    }

    public void setMoiQuanHe(String moiQuanHe) {
        this.moiQuanHe = moiQuanHe;
    }

    public Integer getGiangVienId() {
        return giangVienId;
    }

    public void setGiangVienId(Integer giangVienId) {
        this.giangVienId = giangVienId;
    }
}

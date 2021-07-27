package com.nghiahd.authenticationtest.repository.DTO;

import java.util.Arrays;
import java.util.List;

public class ResultChuanDoan {
    private Integer id;
    private String tenBenh;
    private String tenBenhChiTiet;
    private Integer soBieuHienChon;
    private Integer tongSoBieuHien;
    private Integer phanTram;
    private String danhSachBieuHienChon;
    private List<String> listDanhSach;

    public ResultChuanDoan() {
    }

    public ResultChuanDoan(Integer id, String tenBenh, String tenBenhChiTiet, Integer soBieuHienChon, Integer tongSoBieuHien, Integer phanTram, String danhSachBieuHienChon) {
        this.id = id;
        this.tenBenh = tenBenh;
        this.tenBenhChiTiet = tenBenhChiTiet;
        this.soBieuHienChon = soBieuHienChon;
        this.tongSoBieuHien = tongSoBieuHien;
        this.phanTram = phanTram;
        this.danhSachBieuHienChon = danhSachBieuHienChon;
        this.listDanhSach= Arrays.asList(danhSachBieuHienChon.split("@@"));
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTenBenh() {
        return tenBenh;
    }

    public void setTenBenh(String tenBenh) {
        this.tenBenh = tenBenh;
    }

    public String getTenBenhChiTiet() {
        return tenBenhChiTiet;
    }

    public void setTenBenhChiTiet(String tenBenhChiTiet) {
        this.tenBenhChiTiet = tenBenhChiTiet;
    }

    public Integer getSoBieuHienChon() {
        return soBieuHienChon;
    }

    public void setSoBieuHienChon(Integer soBieuHienChon) {
        this.soBieuHienChon = soBieuHienChon;
    }

    public Integer getTongSoBieuHien() {
        return tongSoBieuHien;
    }

    public void setTongSoBieuHien(Integer tongSoBieuHien) {
        this.tongSoBieuHien = tongSoBieuHien;
    }

    public Integer getPhanTram() {
        return phanTram;
    }

    public void setPhanTram(Integer phanTram) {
        this.phanTram = phanTram;
    }

    public String getDanhSachBieuHienChon() {
        return danhSachBieuHienChon;
    }

    public void setDanhSachBieuHienChon(String danhSachBieuHienChon) {
        this.danhSachBieuHienChon = danhSachBieuHienChon;
    }

    public List<String> getListDanhSach() {
        return listDanhSach;
    }

    public void setListDanhSach(List<String> listDanhSach) {
        this.listDanhSach = listDanhSach;
    }
}

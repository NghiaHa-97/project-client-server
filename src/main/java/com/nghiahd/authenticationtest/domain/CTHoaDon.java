package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;

@Entity
@Table(name = "cthoadon")
public class CTHoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer id;

    @Column(name = "hoadonid")
    private  Integer hoaDonID;

    @Column(name = "sanphamid")
    private  Integer sanPhamID;

    @Column(name = "soluong")
    private  Integer soLuong;

    @Column(name = "dongia")
    private  Integer donGia;

    public CTHoaDon() {
    }

    public CTHoaDon(Integer id, Integer hoaDonID, Integer sanPhamID, Integer soLuong, Integer donGia) {
        this.id = id;
        this.hoaDonID = hoaDonID;
        this.sanPhamID = sanPhamID;
        this.soLuong = soLuong;
        this.donGia = donGia;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getHoaDonID() {
        return hoaDonID;
    }

    public void setHoaDonID(Integer hoaDonID) {
        this.hoaDonID = hoaDonID;
    }

    public Integer getSanPhamID() {
        return sanPhamID;
    }

    public void setSanPhamID(Integer sanPhamID) {
        this.sanPhamID = sanPhamID;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public Integer getDonGia() {
        return donGia;
    }

    public void setDonGia(Integer donGia) {
        this.donGia = donGia;
    }
}

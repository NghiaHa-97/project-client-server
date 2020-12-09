package com.nghiahd.authenticationtest.repository.DTO;

import java.util.Date;

public class SanPhamDTO {

    private Integer idSp;

    private Integer idUser;

    private String username;

    private String tenSanPham;

    private Integer gia;

    private Integer soLuong;

    private String anh;

    private Date ngaySx;

    private String mota;

    private String tenNsx;

    private String tenLoai;

    public SanPhamDTO(Integer idSp, Integer idUser, String username, String tenSanPham, Integer gia, Integer soLuong, String anh, Date ngaySx, String mota, String tenNsx, String tenLoai) {
        this.idSp = idSp;
        this.idUser = idUser;
        this.username = username;
        this.tenSanPham = tenSanPham;
        this.gia = gia;
        this.soLuong = soLuong;
        this.anh = anh;
        this.ngaySx = ngaySx;
        this.mota = mota;
        this.tenNsx = tenNsx;
        this.tenLoai = tenLoai;
    }

    public Integer getIdSp() {
        return idSp;
    }

    public void setIdSp(Integer idSp) {
        this.idSp = idSp;
    }

    public Integer getIdUser() {
        return idUser;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTenSanPham() {
        return tenSanPham;
    }

    public void setTenSanPham(String tenSanPham) {
        this.tenSanPham = tenSanPham;
    }

    public Integer getGia() {
        return gia;
    }

    public void setGia(Integer gia) {
        this.gia = gia;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public String getAnh() {
        return anh;
    }

    public void setAnh(String anh) {
        this.anh = anh;
    }

    public Date getNgaySx() {
        return ngaySx;
    }

    public void setNgaySx(Date ngaySx) {
        this.ngaySx = ngaySx;
    }

    public String getMota() {
        return mota;
    }

    public void setMota(String mota) {
        this.mota = mota;
    }

    public String getTenNsx() {
        return tenNsx;
    }

    public void setTenNsx(String tenNsx) {
        this.tenNsx = tenNsx;
    }

    public String getTenLoai() {
        return tenLoai;
    }

    public void setTenLoai(String tenLoai) {
        this.tenLoai = tenLoai;
    }
}

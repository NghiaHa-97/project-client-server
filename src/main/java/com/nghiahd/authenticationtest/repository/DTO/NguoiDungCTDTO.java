package com.nghiahd.authenticationtest.repository.DTO;

import javax.persistence.Column;
import java.util.Date;

public class NguoiDungCTDTO {
    private Integer userId;

    private String userName;

    private Boolean admin;

    private Integer userDetailId;

    private String hoTen;

    private Boolean gioiTinh;

    private Date ngaySinh;

    private String diaChi;

    private Float taiKhoan;

    private String sdt;

    private String email;

    private String password;
    public NguoiDungCTDTO(Integer userId,
                          String userName,
                          Boolean admin,
                          Integer userDetailId,
                          String hoTen,
                          Boolean gioiTinh,
                          Date ngaySinh,
                          String diaChi,
                          Float taiKhoan,
                          String sdt,
                          String email) {
        this.userId = userId;
        this.userName = userName;
        this.admin = admin;
        this.userDetailId = userDetailId;
        this.hoTen = hoTen;
        this.gioiTinh = gioiTinh;
        this.ngaySinh = ngaySinh;
        this.diaChi = diaChi;
        this.taiKhoan = taiKhoan;
        this.sdt = sdt;
        this.email = email;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Boolean isAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public Integer getUserDetailId() {
        return userDetailId;
    }

    public void setUserDetailId(Integer userDetailId) {
        this.userDetailId = userDetailId;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public Boolean getGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(Boolean gioiTinh) {
        this.gioiTinh = gioiTinh;
    }

    public Date getNgaySinh() {
        return ngaySinh;
    }

    public void setNgaySinh(Date ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public Float getTaiKhoan() {
        return taiKhoan;
    }

    public void setTaiKhoan(Float taiKhoan) {
        this.taiKhoan = taiKhoan;
    }

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

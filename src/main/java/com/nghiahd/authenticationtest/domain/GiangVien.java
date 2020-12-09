package com.nghiahd.authenticationtest.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.nghiahd.authenticationtest.repository.DTO.GiangVienDTO;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "giangvien")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "GiangVienDTO",
                classes={
                        @ConstructorResult(
                                targetClass = GiangVienDTO.class,
                                columns = {
                                        @ColumnResult(name = "id",type = Integer.class),
                                        @ColumnResult(name = "maGV",type = String.class),
                                        @ColumnResult(name = "hoTen",type = String.class),
                                        @ColumnResult(name = "ngaySinh",type = LocalDate.class),
                                        @ColumnResult(name = "gioiTinh",type = Boolean.class),
                                        @ColumnResult(name = "email",type = String.class),
                                        @ColumnResult(name = "noiSinh",type = String.class),
                                        @ColumnResult(name = "danToc",type = String.class),
                                        @ColumnResult(name = "hocVi",type = String.class),
                                        @ColumnResult(name = "chucVu",type = String.class),
                                        @ColumnResult(name = "dienThoai",type = String.class)
                                }
                        )
                }
        )
})
public class GiangVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "magv")
    private String maGV;

    @Column(name = "hoten")
    private String hoTen;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @Column(name = "ngaysinh")
    private LocalDate ngaySinh;

    @Column(name = "gioitinh")
    private Boolean gioiTinh;

    @Column(name = "noisinh")
    private String noiSinh;

    @Column(name = "quequan")
    private String queQuan;

    @Column(name = "dantoc")
    private String danToc;

    @Column(name = "hocvi")
    private String hocVi;

    @Column(name = "namnhanhv")
    private Integer namNhanHV;

    @Column(name = "nuocnhanhv")
    private String nuocNhanHV;
    
    @Column(name = "nambonhiem")
    private Integer namBoNhiem;

    @Column(name = "chucvu")
    private String chucVu;

    @Column(name = "donvicongtac")
    private String donViCongTac;

    @Column(name = "diachi")
    private String diaChi;

    @Column(name = "dienthoai")
    private String dienThoai;

    @Column(name = "email")
    private String email;

    public GiangVien() {
    }

    public GiangVien(Integer id, String maGV, String hoTen, LocalDate ngaySinh, Boolean gioiTinh, String noiSinh, String queQuan, String danToc, String hocVi, Integer namNhanHV, String nuocNhanHV, Integer namBoNhiem, String chucVu, String donViCongTac, String diaChi, String dienThoai, String email) {
        this.id = id;
        this.maGV = maGV;
        this.hoTen = hoTen;
        this.ngaySinh = ngaySinh;
        this.gioiTinh = gioiTinh;
        this.noiSinh = noiSinh;
        this.queQuan = queQuan;
        this.danToc = danToc;
        this.hocVi = hocVi;
        this.namNhanHV = namNhanHV;
        this.nuocNhanHV = nuocNhanHV;
        this.namBoNhiem = namBoNhiem;
        this.chucVu = chucVu;
        this.donViCongTac = donViCongTac;
        this.diaChi = diaChi;
        this.dienThoai = dienThoai;
        this.email = email;
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

    public LocalDate getNgaySinh() {
        return ngaySinh;
    }

    public void setNgaySinh(LocalDate ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public Boolean getGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(Boolean gioiTinh) {
        this.gioiTinh = gioiTinh;
    }

    public String getNoiSinh() {
        return noiSinh;
    }

    public void setNoiSinh(String noiSinh) {
        this.noiSinh = noiSinh;
    }

    public String getQueQuan() {
        return queQuan;
    }

    public void setQueQuan(String queQuan) {
        this.queQuan = queQuan;
    }

    public String getDanToc() {
        return danToc;
    }

    public void setDanToc(String danToc) {
        this.danToc = danToc;
    }

    public String getHocVi() {
        return hocVi;
    }

    public void setHocVi(String hocVi) {
        this.hocVi = hocVi;
    }

    public Integer getNamNhanHV() {
        return namNhanHV;
    }

    public void setNamNhanHV(Integer namNhanHV) {
        this.namNhanHV = namNhanHV;
    }

    public String getNuocNhanHV() {
        return nuocNhanHV;
    }

    public void setNuocNhanHV(String nuocNhanHV) {
        this.nuocNhanHV = nuocNhanHV;
    }

    public Integer getNamBoNhiem() {
        return namBoNhiem;
    }

    public void setNamBoNhiem(Integer namBoNhiem) {
        this.namBoNhiem = namBoNhiem;
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

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getDienThoai() {
        return dienThoai;
    }

    public void setDienThoai(String dienThoai) {
        this.dienThoai = dienThoai;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

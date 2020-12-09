package com.nghiahd.authenticationtest.domain;

import com.nghiahd.authenticationtest.repository.DTO.NguoiDungCTDTO;
import com.nghiahd.authenticationtest.repository.DTO.SanPhamDTO;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "nguoidungct")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "SanPhamDTO",
                classes={
                        @ConstructorResult(
                                targetClass = SanPhamDTO.class,
                                columns = {
                                        @ColumnResult(name = "idSp",type = Integer.class),
                                        @ColumnResult(name = "idUser",type = Integer.class),
                                        @ColumnResult(name = "username",type = String.class),
                                        @ColumnResult(name = "tenSanPham",type = String.class),
                                        @ColumnResult(name = "gia",type = Integer.class),
                                        @ColumnResult(name = "soLuong",type = Integer.class),
                                        @ColumnResult(name = "anh",type = String.class),
                                        @ColumnResult(name = "ngaySx",type = Date.class),
                                        @ColumnResult(name = "mota",type = String.class),
                                        @ColumnResult(name = "tenNsx",type = String.class),
                                        @ColumnResult(name = "tenLoai",type = String.class)
                                }
                        )
                }
        )
})
public class SanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "theloaiid")
    private Integer TheLoaiID;

    @Column(name = "tensanpham")
    private String TenSanPham;

    @Column(name = "gia")
    private Integer Gia;

    @Column(name = "soluong")
    private Integer SoLuong;

    @Column(name = "anhdaidien")
    private String AnhDaiDien;

    @Column(name = "nsxid")
    private Integer NSXID;

    @Column(name = "Ngay")
    private Date Ngay;

    @Column(name = "userid")
    private Integer userid;

    @Column(name = "mota")
    private String moTa;

    public SanPham() {
    }

    public SanPham(Integer id, Integer theLoaiID, String tenSanPham, Integer gia, Integer soLuong, String anhDaiDien, Integer NSXID, Date ngay, Integer userid) {
        this.id = id;
        TheLoaiID = theLoaiID;
        TenSanPham = tenSanPham;
        Gia = gia;
        SoLuong = soLuong;
        AnhDaiDien = anhDaiDien;
        this.NSXID = NSXID;
        Ngay = ngay;
        this.userid = userid;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTheLoaiID() {
        return TheLoaiID;
    }

    public void setTheLoaiID(Integer theLoaiID) {
        TheLoaiID = theLoaiID;
    }

    public String getTenSanPham() {
        return TenSanPham;
    }

    public void setTenSanPham(String tenSanPham) {
        TenSanPham = tenSanPham;
    }

    public Integer getGia() {
        return Gia;
    }

    public void setGia(Integer gia) {
        Gia = gia;
    }

    public Integer getSoLuong() {
        return SoLuong;
    }

    public void setSoLuong(Integer soLuong) {
        SoLuong = soLuong;
    }

    public String getAnhDaiDien() {
        return AnhDaiDien;
    }

    public void setAnhDaiDien(String anhDaiDien) {
        AnhDaiDien = anhDaiDien;
    }

    public Integer getNSXID() {
        return NSXID;
    }

    public void setNSXID(Integer NSXID) {
        this.NSXID = NSXID;
    }

    public Date getNgay() {
        return Ngay;
    }

    public void setNgay(Date ngay) {
        Ngay = ngay;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }
}

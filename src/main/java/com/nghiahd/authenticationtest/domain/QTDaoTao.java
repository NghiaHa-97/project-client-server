package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "qtdaotao")
public class QTDaoTao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "capdt")
    private String capDT;

    @Column(name = "hedt")
    private String heDT;

    @Column(name = "noidt")
    private String noiDT;

    @Column(name = "nganhhoc")
    private String nganhHoc;

    @Column(name = "nuocdt")
    private String nuocDT;

    @Column(name = "namcapbang")
    private Integer namCapBang;

    @Column(name = "tenluanan")
    private String tenLuanAn;

    @Column(name = "bangdh")
    private String bangDH;

    @Column(name = "ngaykhaibosung")
    private Date ngayKhaiBoSung;

    @Column(name = "giangvienid")
    private Integer giangVienId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCapDT() {
        return capDT;
    }

    public void setCapDT(String capDT) {
        this.capDT = capDT;
    }

    public String getHeDT() {
        return heDT;
    }

    public void setHeDT(String heDT) {
        this.heDT = heDT;
    }

    public String getNoiDT() {
        return noiDT;
    }

    public void setNoiDT(String noiDT) {
        this.noiDT = noiDT;
    }

    public String getNganhHoc() {
        return nganhHoc;
    }

    public void setNganhHoc(String nganhHoc) {
        this.nganhHoc = nganhHoc;
    }

    public String getNuocDT() {
        return nuocDT;
    }

    public void setNuocDT(String nuocDT) {
        this.nuocDT = nuocDT;
    }

    public Integer getNamCapBang() {
        return namCapBang;
    }

    public void setNamCapBang(Integer namCapBang) {
        this.namCapBang = namCapBang;
    }

    public String getTenLuanAn() {
        return tenLuanAn;
    }

    public void setTenLuanAn(String tenLuanAn) {
        this.tenLuanAn = tenLuanAn;
    }

    public String getBangDH() {
        return bangDH;
    }

    public void setBangDH(String bangDH) {
        this.bangDH = bangDH;
    }

    public Date getNgayKhaiBoSung() {
        return ngayKhaiBoSung;
    }

    public void setNgayKhaiBoSung(Date ngayKhaiBoSung) {
        this.ngayKhaiBoSung = ngayKhaiBoSung;
    }

    public Integer getGiangVienId() {
        return giangVienId;
    }

    public void setGiangVienId(Integer giangVienId) {
        this.giangVienId = giangVienId;
    }
}

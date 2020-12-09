package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "monhoc")
public class MonHoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "mamonhoc")
    private String maMonHoc;

    @Column(name = "tenmonhoc")
    private String tenMonHoc;

    @Column(name = "sotinchi")
    private Integer soTinChi;

    @Column(name = "sotietgiangday")
    private Integer soTietGiangDay;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMaMonHoc() {
        return maMonHoc;
    }

    public void setMaMonHoc(String maMonHoc) {
        this.maMonHoc = maMonHoc;
    }

    public String getTenMonHoc() {
        return tenMonHoc;
    }

    public void setTenMonHoc(String tenMonHoc) {
        this.tenMonHoc = tenMonHoc;
    }

    public Integer getSoTinChi() {
        return soTinChi;
    }

    public void setSoTinChi(Integer soTinChi) {
        this.soTinChi = soTinChi;
    }

    public Integer getSoTietGiangDay() {
        return soTietGiangDay;
    }

    public void setSoTietGiangDay(Integer soTietGiangDay) {
        this.soTietGiangDay = soTietGiangDay;
    }
}

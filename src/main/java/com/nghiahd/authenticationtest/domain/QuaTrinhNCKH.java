package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "quatrinhnckh")
public class QuaTrinhNCKH {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tendetai")
    private String tenDeTai;

    @Column(name = "nambatdau")
    private Date namBatDau;

    @Column(name = "namhoanthanh")
    private Date namHoanThanh;

    @Column(name = "capdodetai")
    private String capDoDeTai;

    @Column(name = "trachnhiemthamgia")
    private String trachNhiemThamGia;

    @Column(name = "ngaykhaibosung")
    private Date NgayKhaiBoSung;

    @Column(name = "giangvienid")
    private Integer GiangVienId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTenDeTai() {
        return tenDeTai;
    }

    public void setTenDeTai(String tenDeTai) {
        this.tenDeTai = tenDeTai;
    }

    public Date getNamBatDau() {
        return namBatDau;
    }

    public void setNamBatDau(Date namBatDau) {
        this.namBatDau = namBatDau;
    }

    public Date getNamHoanThanh() {
        return namHoanThanh;
    }

    public void setNamHoanThanh(Date namHoanThanh) {
        this.namHoanThanh = namHoanThanh;
    }

    public String getCapDoDeTai() {
        return capDoDeTai;
    }

    public void setCapDoDeTai(String capDoDeTai) {
        this.capDoDeTai = capDoDeTai;
    }

    public String getTrachNhiemThamGia() {
        return trachNhiemThamGia;
    }

    public void setTrachNhiemThamGia(String trachNhiemThamGia) {
        this.trachNhiemThamGia = trachNhiemThamGia;
    }

    public Date getNgayKhaiBoSung() {
        return NgayKhaiBoSung;
    }

    public void setNgayKhaiBoSung(Date ngayKhaiBoSung) {
        NgayKhaiBoSung = ngayKhaiBoSung;
    }

    public Integer getGiangVienId() {
        return GiangVienId;
    }

    public void setGiangVienId(Integer giangVienId) {
        GiangVienId = giangVienId;
    }
}

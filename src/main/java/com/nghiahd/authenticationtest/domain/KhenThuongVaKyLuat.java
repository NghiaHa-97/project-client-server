package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "khenthuongvakyluat")
public class KhenThuongVaKyLuat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ngaythangnam")
    private Date ngayThangNam;

    @Column(name = "lydohinhthuc")
    private String lyDoHinhThuc;

    @Column(name = "capqd")
    private Integer capQD;

    @Column(name = "giangvienid")
    private Integer giangVienId;

    @Column(name = "ngaykhaibosung")
    private Date ngayKhaiBoSung;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getNgayThangNam() {
        return ngayThangNam;
    }

    public void setNgayThangNam(Date ngayThangNam) {
        this.ngayThangNam = ngayThangNam;
    }

    public String getLyDoHinhThuc() {
        return lyDoHinhThuc;
    }

    public void setLyDoHinhThuc(String lyDoHinhThuc) {
        this.lyDoHinhThuc = lyDoHinhThuc;
    }

    public Integer getCapQD() {
        return capQD;
    }

    public void setCapQD(Integer capQD) {
        this.capQD = capQD;
    }

    public Integer getGiangVienId() {
        return giangVienId;
    }

    public void setGiangVienId(Integer giangVienId) {
        this.giangVienId = giangVienId;
    }

    public Date getNgayKhaiBoSung() {
        return ngayKhaiBoSung;
    }

    public void setNgayKhaiBoSung(Date ngayKhaiBoSung) {
        this.ngayKhaiBoSung = ngayKhaiBoSung;
    }
}

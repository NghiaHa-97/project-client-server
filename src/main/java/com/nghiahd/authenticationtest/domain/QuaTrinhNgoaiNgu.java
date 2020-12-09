package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "quatrinhngoaingu")
public class QuaTrinhNgoaiNgu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ngoainguid")
    private Integer ngoaiNguId;

    @Column(name = "ngaykhaibosung")
    private Date ngayKhaiBoSung;

    @Column(name = "giangvienid")
    private Integer giangVienId;

    public QuaTrinhNgoaiNgu() {
    }

    public QuaTrinhNgoaiNgu(Integer id, Integer ngoaiNguId, Date ngayKhaiBoSung, Integer giangVienId) {
        this.id = id;
        this.ngoaiNguId = ngoaiNguId;
        this.ngayKhaiBoSung = ngayKhaiBoSung;
        this.giangVienId = giangVienId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNgoaiNguId() {
        return ngoaiNguId;
    }

    public void setNgoaiNguId(Integer ngoaiNguId) {
        this.ngoaiNguId = ngoaiNguId;
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

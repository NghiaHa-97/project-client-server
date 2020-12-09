package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "quatrinhngoaingu")
public class QuaTrinhNgoaiNgu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tenngoaingu")
    private String tenNgoaiNgu;

    @Column(name = "trinhdo")
    private String trinhDo;

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

    public String getTenNgoaiNgu() {
        return tenNgoaiNgu;
    }

    public void setTenNgoaiNgu(String tenNgoaiNgu) {
        this.tenNgoaiNgu = tenNgoaiNgu;
    }

    public String getTrinhDo() {
        return trinhDo;
    }

    public void setTrinhDo(String trinhDo) {
        this.trinhDo = trinhDo;
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

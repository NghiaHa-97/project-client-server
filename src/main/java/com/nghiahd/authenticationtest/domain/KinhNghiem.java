package com.nghiahd.authenticationtest.domain;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "kinhnghiem")
public class KinhNghiem {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tungay")
    private Date tuNgay;

    @Column(name = "denngay")
    private Date denNgay;

    @Column(name = "noidung")
    private String noiDung;

//    @Column(name = "bacsiid")
//    private Integer bacSiId;

    public KinhNghiem() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getTuNgay() {
        return tuNgay;
    }

    public void setTuNgay(Date tuNgay) {
        this.tuNgay = tuNgay;
    }

    public Date getDenNgay() {
        return denNgay;
    }

    public void setDenNgay(Date denNgay) {
        this.denNgay = denNgay;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

//    public Integer getBacSiId() {
//        return bacSiId;
//    }
//
//    public void setBacSiId(Integer bacSiId) {
//        this.bacSiId = bacSiId;
//    }
}

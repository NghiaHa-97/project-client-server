package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "hoadon")
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nguoidungctid")
    private Integer NguoiDungCTID;

    @Column(name = "time")
    private Date Time;

    @Column(name = "tongtien")
    private Integer TongTien;

    public HoaDon() {
    }

    public HoaDon(Integer id, Integer nguoiDungCTID, Date time, Integer tongTien) {
        this.id = id;
        NguoiDungCTID = nguoiDungCTID;
        Time = time;
        TongTien = tongTien;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNguoiDungCTID() {
        return NguoiDungCTID;
    }

    public void setNguoiDungCTID(Integer nguoiDungCTID) {
        NguoiDungCTID = nguoiDungCTID;
    }

    public Date getTime() {
        return Time;
    }

    public void setTime(Date time) {
        Time = time;
    }

    public Integer getTongTien() {
        return TongTien;
    }

    public void setTongTien(Integer tongTien) {
        TongTien = tongTien;
    }


}

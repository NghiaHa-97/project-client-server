package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;

@Entity
@Table(name = "nhasanxuat")
public class NhaSanXuat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tennsx")
    private String TenNSX;


    public NhaSanXuat() {
    }

    public NhaSanXuat(Integer id, String tenNSX) {
        this.id = id;
        TenNSX = tenNSX;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTenNSX() {
        return TenNSX;
    }

    public void setTenNSX(String tenNSX) {
        TenNSX = tenNSX;
    }
}

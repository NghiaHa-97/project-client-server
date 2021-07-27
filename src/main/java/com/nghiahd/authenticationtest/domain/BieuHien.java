package com.nghiahd.authenticationtest.domain;


import javax.persistence.*;

@Entity
@Table(name = "bieuhien")
public class BieuHien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "mabieuhien")
    private String maBieuHien;

    @Column(name = "mota")
    private String moTa;

    public BieuHien() {
    }

    public BieuHien(Integer id, String maBieuHien, String moTa) {
        this.id = id;
        this.maBieuHien = maBieuHien;
        this.moTa = moTa;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMaBieuHien() {
        return maBieuHien;
    }

    public void setMaBieuHien(String maBieuHien) {
        this.maBieuHien = maBieuHien;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }
}

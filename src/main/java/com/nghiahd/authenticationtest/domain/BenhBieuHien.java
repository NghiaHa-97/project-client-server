package com.nghiahd.authenticationtest.domain;


import javax.persistence.*;

@Entity
@Table(name = "benhbieuhien")
public class BenhBieuHien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "benhctid")
    private Integer benhCTId;

    @Column(name = "bieuhienid")
    private Integer bieuHienId;


    public BenhBieuHien() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBenhCTId() {
        return benhCTId;
    }

    public void setBenhCTId(Integer benhCTId) {
        this.benhCTId = benhCTId;
    }

    public Integer getBieuHienId() {
        return bieuHienId;
    }

    public void setBieuHienId(Integer bieuHienId) {
        this.bieuHienId = bieuHienId;
    }
}

package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;

@Entity
@Table(name = "ngoaingu")
public class NgoaiNgu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tennn")
    private String tenNgoaiNgu;



    public NgoaiNgu() {
    }

    public NgoaiNgu(Integer id, String tenNgoaiNgu) {
        this.id = id;
        this.tenNgoaiNgu = tenNgoaiNgu;
    }

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

}

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

    @Column(name = "trinhdo")
    private String trinhDo;

    public NgoaiNgu() {
    }

    public NgoaiNgu(Integer id, String tenNgoaiNgu, String trinhDo) {
        this.id = id;
        this.tenNgoaiNgu = tenNgoaiNgu;
        this.trinhDo = trinhDo;
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

    public String getTrinhDo() {
        return trinhDo;
    }

    public void setTrinhDo(String trinhDo) {
        this.trinhDo = trinhDo;
    }
}

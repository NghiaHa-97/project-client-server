package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;

@Entity
@Table(name = "benh")
public class Benh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "mabenh")
    private String maBenh;

    @Column(name = "tenbenh")
    private String tenBenh;

    public Benh() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMaBenh() {
        return maBenh;
    }

    public void setMaBenh(String maBenh) {
        this.maBenh = maBenh;
    }

    public String getTenBenh() {
        return tenBenh;
    }

    public void setTenBenh(String tenBenh) {
        this.tenBenh = tenBenh;
    }

}

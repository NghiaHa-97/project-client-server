package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;

@Entity
@Table(name = "benhchitiet")
public class BenhChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tenbenh")
    private String tenBenh;

    @Column(name = "benhid")
    private Integer benhId;

    public BenhChiTiet() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTenBenh() {
        return tenBenh;
    }

    public void setTenBenh(String tenBenh) {
        this.tenBenh = tenBenh;
    }

    public Integer getBenhId() {
        return benhId;
    }

    public void setBenhId(Integer benhId) {
        this.benhId = benhId;
    }
}

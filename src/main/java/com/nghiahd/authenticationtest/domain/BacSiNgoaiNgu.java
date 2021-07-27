package com.nghiahd.authenticationtest.domain;

import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "bacsingoaingu")
public class BacSiNgoaiNgu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "bacsiid")
    private Integer bacSiId;

//    @ManyToOne
//    @JoinColumn(name = "bacsiid")
//    private BacSi bacSi;

    @Column(name = "ngoainguid")
    private Integer ngoaiNguId;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "id",cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JsonIgnore
    private Set<NgoaiNgu> ngoaiNgu;

    public BacSiNgoaiNgu() {
    }

    public Set<NgoaiNgu> getNgoaiNgu() {
        return ngoaiNgu;
    }

    public void setNgoaiNgu(Set<NgoaiNgu> ngoaiNgu) {
        this.ngoaiNgu = ngoaiNgu;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBacSiId() {
        return bacSiId;
    }

    public void setBacSiId(Integer bacSiId) {
        this.bacSiId = bacSiId;
    }

    public Integer getNgoaiNguId() {
        return ngoaiNguId;
    }

    public void setNgoaiNguId(Integer ngoaiNguId) {
        this.ngoaiNguId = ngoaiNguId;
    }

//    public BacSi getBacSi() {
//        return bacSi;
//    }
//
//    public void setBacSi(BacSi bacSi) {
//        this.bacSi = bacSi;
//    }
}

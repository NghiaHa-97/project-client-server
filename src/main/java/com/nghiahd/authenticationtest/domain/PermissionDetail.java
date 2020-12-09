package com.nghiahd.authenticationtest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "permissiondetail")
public class PermissionDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //@ManyToOne
    @Column(name = "permissionid")
    private Integer permissionId;

    @Column(name = "name")
    private  String name;

    @Column(name = "code")
    private  String code;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "permissionDetailId",cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    //@Fetch(value = FetchMode.SUBSELECT)
    @JsonIgnore
    private Set<PermissionDetailRole> permissionDetailRoles;

    public PermissionDetail() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(Integer permissionId) {
        this.permissionId = permissionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<PermissionDetailRole> getPermissionDetailRoles() {
        return permissionDetailRoles;
    }

    public void setPermissionDetailRoles(Set<PermissionDetailRole> permissionDetailRoles) {
        this.permissionDetailRoles = permissionDetailRoles;
    }
}

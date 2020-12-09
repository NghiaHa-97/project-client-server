package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;

@Entity
@Table(name = "permissiondetailrole")
public class PermissionDetailRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "permissiondetailid")
    private Integer permissionDetailId;

    @Column(name = "roleid")
    private Integer roleId;

    public PermissionDetailRole() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPermissionDetailId() {
        return permissionDetailId;
    }

    public void setPermissionDetailId(Integer permissionDetailId) {
        this.permissionDetailId = permissionDetailId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}

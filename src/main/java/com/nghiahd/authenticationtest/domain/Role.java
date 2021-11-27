package com.nghiahd.authenticationtest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "rolename")
    private String roleName;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "roleId",cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    //@Fetch(value = FetchMode.SUBSELECT)
    @JsonIgnore
    private Set<UserRole> userRoles;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "roleId",cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    //@Fetch(value = FetchMode.SUBSELECT)
    @JsonIgnore
    private Set<PermissionDetailRole> permissionDetailRoles;

    public Role() {
    }



    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Set<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    public Set<PermissionDetailRole> getPermissionDetailRoles() {
        return permissionDetailRoles;
    }

    public void setPermissionDetailRoles(Set<PermissionDetailRole> permissionDetailRoles) {
        this.permissionDetailRoles = permissionDetailRoles;
    }

    public Role(Integer id, String roleName) {
        this.id = id;
        this.roleName = roleName;
    }
}

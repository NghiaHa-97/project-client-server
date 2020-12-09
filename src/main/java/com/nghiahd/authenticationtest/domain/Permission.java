package com.nghiahd.authenticationtest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nghiahd.authenticationtest.repository.DTO.PermissionDetailDTO;
import com.nghiahd.authenticationtest.repository.DTO.RolePermissionDTO;
import com.nghiahd.authenticationtest.repository.DTO.UserPermissionDTO;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "permission")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "UserPermissionDTO",
                classes={
                        @ConstructorResult(
                                targetClass = UserPermissionDTO.class,
                                columns = {
                                        @ColumnResult(name = "userName",type = String.class),
                                        @ColumnResult(name = "roleName",type = String.class),
                                        @ColumnResult(name = "name",type = String.class),
                                        @ColumnResult(name = "code",type = String.class)
                                }
                        )
                }
        ),
        @SqlResultSetMapping(
                name = "RolePermissionDTO",
                classes={
                        @ConstructorResult(
                                targetClass = RolePermissionDTO.class,
                                columns = {
                                        @ColumnResult(name = "id",type = Integer.class),
                                        @ColumnResult(name = "roleName",type = String.class),
                                        @ColumnResult(name = "permissionId",type = Integer.class),
                                        @ColumnResult(name = "permissionName",type = String.class),
                                        @ColumnResult(name = "permissionCode",type = String.class),
                                        @ColumnResult(name = "permissionDetailId",type = Integer.class),
                                        @ColumnResult(name = "permissionDetailCode",type = String.class),
                                        @ColumnResult(name = "permissionDetailName",type = String.class)
                                }
                        )
                }
        ),
        @SqlResultSetMapping(
                name = "PermissionDetailDTO",
                classes={
                        @ConstructorResult(
                                targetClass = PermissionDetailDTO.class,
                                columns = {
                                        @ColumnResult(name = "permissionId",type = Integer.class),
                                        @ColumnResult(name = "permissionName",type = String.class),
                                        @ColumnResult(name = "permissionCode",type = String.class),
                                        @ColumnResult(name = "permissionDetailId",type = Integer.class),
                                        @ColumnResult(name = "permissionDetailCode",type = String.class),
                                        @ColumnResult(name = "permissionDetailName",type = String.class)
                                }
                        )
                }
        )
})
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private  String name;

    @Column(name = "code")
    private  String code;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "permissionId",cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.REMOVE})
    //@Fetch(value = FetchMode.SUBSELECT)
    @JsonIgnore
    private Set<PermissionDetail> permissionDetails=new HashSet<>();

    public Permission() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Set<PermissionDetail> getPermissionDetails() {
        return permissionDetails;
    }

    public void setPermissionDetails(Set<PermissionDetail> permissionDetails) {
        this.permissionDetails = permissionDetails;
    }
}

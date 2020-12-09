package com.nghiahd.authenticationtest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nghiahd.authenticationtest.repository.DTO.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "[user]")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "AdminAndIdDTO",
                classes={
                        @ConstructorResult(
                                targetClass = AdminAndIdDTO.class,
                                columns = {
                                        @ColumnResult(name = "admin",type = Boolean.class),
                                        @ColumnResult(name = "id",type = Integer.class),
                                }
                        )
                }
        ),
        @SqlResultSetMapping(
                name = "UserDetailDTO",
                classes={
                        @ConstructorResult(
                                targetClass = UserDetailDTO.class,
                                columns = {
                                        @ColumnResult(name = "id",type = Integer.class),
                                        @ColumnResult(name = "username",type = String.class),
                                        @ColumnResult(name = "password",type = String.class),
                                }
                        )
                }
        )
})
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username")
    private String userName;

    @Column(name="password")
    private String password;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "nguoidungctid", referencedColumnName = "id")
    private NguoiDungCT nguoiDungCT;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "userId",cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    //@Fetch(value = FetchMode.SUBSELECT)
    @JsonIgnore
    private Set<UserRole> userRoles;

    public UserAccount() {
        this.nguoiDungCT=new NguoiDungCT();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    public NguoiDungCT getNguoiDungCT() {
        return nguoiDungCT;
    }

    public void setNguoiDungCT(NguoiDungCT nguoiDungCT) {
        this.nguoiDungCT = nguoiDungCT;
    }
}

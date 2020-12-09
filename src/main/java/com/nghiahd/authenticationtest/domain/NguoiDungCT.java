package com.nghiahd.authenticationtest.domain;

import com.nghiahd.authenticationtest.repository.DTO.AdminAndIdDTO;
import com.nghiahd.authenticationtest.repository.DTO.NguoiDungCTDTO;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "nguoidungct")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "NguoiDungCTDTO",
                classes={
                        @ConstructorResult(
                                targetClass = NguoiDungCTDTO.class,
                                columns = {
                                        @ColumnResult(name = "userId",type = Integer.class),
                                        @ColumnResult(name = "userName",type = String.class),
                                        @ColumnResult(name = "admin",type = Boolean.class),
                                        @ColumnResult(name = "userDetailId",type = Integer.class),
                                        @ColumnResult(name = "hoTen",type = String.class),
                                        @ColumnResult(name = "gioiTinh",type = Boolean.class),
                                        @ColumnResult(name = "ngaySinh",type = Date.class),
                                        @ColumnResult(name = "diaChi",type = String.class),
                                        @ColumnResult(name = "taiKhoan",type = Float.class),
                                        @ColumnResult(name = "sdt",type = String.class),
                                        @ColumnResult(name = "email",type = String.class)
                                }
                        )
                }
        )
})
public class NguoiDungCT {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "hoten")
    private String hoTen;

    @Column(name = "gioitinh")
    private Boolean gioiTinh;

    @Column(name = "ngaysinh")
    private Date ngaySinh;

    @Column(name = "diachi")
    private String diaChi;

    @Column(name = "taikhoan")
    private Float taiKhoan;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "email")
    private String email;

    @OneToOne(mappedBy = "nguoiDungCT")
    private UserAccount userAccount;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public Boolean getGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(Boolean gioiTinh) {
        this.gioiTinh = gioiTinh;
    }

    public Date getNgaySinh() {
        return ngaySinh;
    }

    public void setNgaySinh(Date ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public Float getTaiKhoan() {
        return taiKhoan;
    }

    public void setTaiKhoan(Float taiKhoan) {
        this.taiKhoan = taiKhoan;
    }

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserAccount getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }
}

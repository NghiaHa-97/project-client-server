package com.nghiahd.authenticationtest.domain;

//import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nghiahd.authenticationtest.repository.DTO.ResultChuanDoan;
import org.codehaus.jackson.annotate.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.nghiahd.authenticationtest.repository.DTO.BacSiDTO;
import com.nghiahd.authenticationtest.repository.DTO.NguoiDungCTDTO;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.Set;


@Entity
@Table(name = "bacsi")
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "BacSiDTO",
                classes={
                        @ConstructorResult(
                                targetClass = BacSiDTO.class,
                                columns = {
                                        @ColumnResult(name = "id",type = Integer.class),
                                        @ColumnResult(name = "maBS",type = String.class),
                                        @ColumnResult(name = "hoTen",type = String.class),
                                        @ColumnResult(name = "hocVi",type = String.class),
                                        @ColumnResult(name = "chucVu",type = String.class),
                                        @ColumnResult(name = "donViCongTac",type = String.class),
                                        @ColumnResult(name = "khoaId",type = Integer.class),
                                        @ColumnResult(name = "anh",type = String.class),
                                        @ColumnResult(name = "gioiThieu",type = String.class)
                                }
                        )
                }
        ),
//        @SqlResultSetMapping(
//                name = "BieuHienDTO",
//                classes={
//                        @ConstructorResult(
//                                targetClass = Bieu.class,
//                                columns = {
//                                        @ColumnResult(name = "id",type = Integer.class),
//                                        @ColumnResult(name = "maBS",type = String.class),
//                                        @ColumnResult(name = "hoTen",type = String.class),
//                                        @ColumnResult(name = "hocVi",type = String.class),
//                                        @ColumnResult(name = "chucVu",type = String.class),
//                                        @ColumnResult(name = "donViCongTac",type = String.class),
//                                        @ColumnResult(name = "khoaId",type = Integer.class),
//                                        @ColumnResult(name = "anh",type = String.class),
//                                        @ColumnResult(name = "gioiThieu",type = String.class)
//                                }
//                        )
//                }
//        ),
        @SqlResultSetMapping(
                name = "ResultChuanDoan",
                classes={
                        @ConstructorResult(
                                targetClass = ResultChuanDoan.class,
                                columns = {
                                        @ColumnResult(name = "id",type = Integer.class),
                                        @ColumnResult(name = "tenBenh",type = String.class),
                                        @ColumnResult(name = "tenBenhChiTiet",type = String.class),
                                        @ColumnResult(name = "soBieuHienChon",type = Integer.class),
                                        @ColumnResult(name = "tongSoBieuHien",type = Integer.class),
                                        @ColumnResult(name = "phanTram",type = Integer.class),
                                        @ColumnResult(name = "danhSachBieuHienChon",type = String.class),

                                }
                        )
                }
        )
})
public class BacSi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "mabs")
    private String maBS;

    @Column(name = "hoten")
    private String hoTen;

//    @JsonDeserialize(using = LocalDateDeserializer.class)
//    @JsonSerialize(using = LocalDateSerializer.class)
    @Column(name = "ngaysinh")
    private LocalDate ngaySinh;

    @Column(name = "gioitinh")
    private Boolean gioiTinh;


    @Column(name = "dantoc")
    private String danToc;

    @Column(name = "hocvi")
    private String hocVi;

    @Column(name = "chucvu")
    private String chucVu;

    @Column(name = "donvicongtac")
    private String donViCongTac;

    @Column(name = "diachi")
    private String diaChi;

    @Column(name = "dienthoai")
    private String dienThoai;

    @Column(name = "email")
    private String email;

    @Column(name = "khoaid")
    private Integer khoaId;

    @Column(name = "anh")
    private String anh;

    @Column(name = "gioithieu")
    private String gioiThieu;

    @OneToMany(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    //@Fetch(value = FetchMode.SUBSELECT)
    @JoinColumn(name = "bacsiid")
    @JsonIgnore
    private Set<KinhNghiem> kinhNghiem;

//    @OneToMany(fetch = FetchType.EAGER,mappedBy = "bacSiId",cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @OneToMany(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    //@Fetch(value = FetchMode.SUBSELECT)
    @JoinColumn(name = "bacsiid")
    @JsonIgnore
    private Set<ChungChi> chungChi;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "bacSiId",cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    //@Fetch(value = FetchMode.SUBSELECT)
    @JsonIgnore
    private Set<BacSiNgoaiNgu> bacSiNgoaiNgu;


    public BacSi() {
    }

    public Set<KinhNghiem> getKinhNghiem() {
        return kinhNghiem;
    }

    public void setKinhNghiem(Set<KinhNghiem> kinhNghiem) {
        this.kinhNghiem = kinhNghiem;
    }

    public Set<ChungChi> getChungChi() {
        return chungChi;
    }

    public void setChungChi(Set<ChungChi> chungChi) {
        this.chungChi = chungChi;
    }

    public Set<BacSiNgoaiNgu> getBacSiNgoaiNgu() {
        return bacSiNgoaiNgu;
    }

    public void setBacSiNgoaiNgu(Set<BacSiNgoaiNgu> bacSiNgoaiNgu) {
        this.bacSiNgoaiNgu = bacSiNgoaiNgu;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMaBS() {
        return maBS;
    }

    public void setMaBS(String maBS) {
        this.maBS = maBS;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public LocalDate getNgaySinh() {
        return ngaySinh;
    }

    public void setNgaySinh(LocalDate ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public Boolean getGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(Boolean gioiTinh) {
        this.gioiTinh = gioiTinh;
    }

    public String getDanToc() {
        return danToc;
    }

    public void setDanToc(String danToc) {
        this.danToc = danToc;
    }

    public String getHocVi() {
        return hocVi;
    }

    public void setHocVi(String hocVi) {
        this.hocVi = hocVi;
    }

    public String getChucVu() {
        return chucVu;
    }

    public void setChucVu(String chucVu) {
        this.chucVu = chucVu;
    }

    public String getDonViCongTac() {
        return donViCongTac;
    }

    public void setDonViCongTac(String donViCongTac) {
        this.donViCongTac = donViCongTac;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getDienThoai() {
        return dienThoai;
    }

    public void setDienThoai(String dienThoai) {
        this.dienThoai = dienThoai;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getKhoaId() {
        return khoaId;
    }

    public void setKhoaId(Integer khoaId) {
        this.khoaId = khoaId;
    }

    public String getAnh() {
        return anh;
    }

    public void setAnh(String anh) {
        this.anh = anh;
    }

    public String getGioiThieu() {
        return gioiThieu;
    }

    public void setGioiThieu(String gioiThieu) {
        this.gioiThieu = gioiThieu;
    }

}

package com.nghiahd.authenticationtest.repository.DTO;

import java.time.LocalDate;

public class GiangVienDTO {

	private Integer id;

	private String maGV;

	private String hoTen;

	private LocalDate ngaySinh;

	private Boolean gioiTinh;

	private String noiSinh;

	private String queQuan;

	private String danToc;

	private String hocVi;

	private Integer namNhanHV;

	private String nuocNhanHV;

	private Integer namBoNhiem;

	private String chucVu;

	private String donViCongTac;

	private String diaChi;

	private String dienThoai;

	private String email;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMaGV() {
		return maGV;
	}

	public void setMaGV(String maGV) {
		this.maGV = maGV;
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

	public String getNoiSinh() {
		return noiSinh;
	}

	public void setNoiSinh(String noiSinh) {
		this.noiSinh = noiSinh;
	}

	public String getQueQuan() {
		return queQuan;
	}

	public void setQueQuan(String queQuan) {
		this.queQuan = queQuan;
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

	public Integer getNamNhanHV() {
		return namNhanHV;
	}

	public void setNamNhanHV(Integer namNhanHV) {
		this.namNhanHV = namNhanHV;
	}

	public String getNuocNhanHV() {
		return nuocNhanHV;
	}

	public void setNuocNhanHV(String nuocNhanHV) {
		this.nuocNhanHV = nuocNhanHV;
	}

	public Integer getNamBoNhiem() {
		return namBoNhiem;
	}

	public void setNamBoNhiem(Integer namBoNhiem) {
		this.namBoNhiem = namBoNhiem;
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

	public GiangVienDTO(Integer id, String maGV, String hoTen, LocalDate ngaySinh, Boolean gioiTinh, String email,
                        String noiSinh, String danToc, String hocVi, String chucVu, String dienThoai) {
		super();
		this.id = id;
		this.maGV = maGV;
		this.hoTen = hoTen;
		this.ngaySinh = ngaySinh;
		this.gioiTinh = gioiTinh;
		this.noiSinh = noiSinh;
		this.danToc = danToc;
		this.hocVi = hocVi;
		this.chucVu = chucVu;
		this.dienThoai = dienThoai;
		this.email = email;
	}
}

package com.nghiahd.authenticationtest.service;

import com.nghiahd.authenticationtest.domain.GiangVien;
import com.nghiahd.authenticationtest.repository.DTO.GiangVienDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface GiangVienService {
    //List<GiangVien> getAllGiangVien();
    List<GiangVien> getGiangVienByMaNV(String maNV);
    List<GiangVien> getGiangVienByHoTenOrMaGV(String keyword);
    GiangVien saveGiangVien(GiangVien giangvien);
    Optional<GiangVien> getGiangVientById(Integer id);
    void deleteGiangVien(Integer id);
    Page<GiangVienDTO> getAllGiangVien(Pageable pageable, String maGV_hoTen);
}

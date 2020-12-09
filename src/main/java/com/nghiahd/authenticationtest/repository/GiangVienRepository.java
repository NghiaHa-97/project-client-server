package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.domain.GiangVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GiangVienRepository extends JpaRepository<GiangVien, Integer> {
	List<GiangVien> findByMaGV(String maGV);
	@Query("Select g from GiangVien g where g.hoTen = ?1 OR g.maGV = ?1 ")
	List<GiangVien> findByHoTenOrMaGV(String keyword);
	
}

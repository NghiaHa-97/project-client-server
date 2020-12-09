package com.nghiahd.authenticationtest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nghiahd.authenticationtest.domain.QuaTrinhNgoaiNgu;

public interface QuaTrinhNgoaiNguRepository extends JpaRepository<QuaTrinhNgoaiNgu, Integer>{

	List<QuaTrinhNgoaiNgu> findByGiangVienId(Integer giangVienId);
	
	@Query(nativeQuery = true, value="SELECT TOP 1 * FROM QuaTrinhNgoaiNgu x WHERE x.giangVienId = ?1 ORDER BY x.ngayKhaiBoSung DESC")
	QuaTrinhNgoaiNgu getQTNN_NearestDayByGiangVienId(Integer giangvienId);
	
}

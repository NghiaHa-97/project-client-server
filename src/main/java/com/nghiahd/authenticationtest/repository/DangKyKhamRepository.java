package com.nghiahd.authenticationtest.repository;


import com.nghiahd.authenticationtest.domain.LichKham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DangKyKhamRepository extends JpaRepository<LichKham,Integer>,DangKyKhamRepositoryCustom {
}

package com.nghiahd.authenticationtest.repository;


import com.nghiahd.authenticationtest.domain.MonHoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonHocRepository extends JpaRepository<MonHoc,Integer>, MonHocRepositoryCustom {
}

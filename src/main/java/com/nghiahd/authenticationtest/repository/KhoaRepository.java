package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.domain.Khoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhoaRepository extends JpaRepository<Khoa, Integer> {

    @Query(value = "Select g.* from dbo.Khoa g  ", nativeQuery = true)
    List<Khoa> getlAllKhoa();


}

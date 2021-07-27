package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.domain.Khoa;
import com.nghiahd.authenticationtest.domain.NgoaiNgu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NgoaiNguRepository extends JpaRepository<NgoaiNgu, Integer> {
    @Query(value = "Select g.* from dbo.NgoaiNgu g  ", nativeQuery = true)
    List<NgoaiNgu> grtAllNN();

}

package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.domain.BacSi;
import com.nghiahd.authenticationtest.domain.Khoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface BacSiRepository extends JpaRepository<BacSi,Integer>,BacSiRepositoryCustom{
    @Query(value = "Select g.* from dbo.BacSi g  ", nativeQuery = true)
    List<BacSi> getAllBacSi();


}

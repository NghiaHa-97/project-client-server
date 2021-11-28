package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.domain.CommuneWard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommuneWardRepository extends JpaRepository<CommuneWard, Integer> {
    List<CommuneWard> findByDistrictIDOrderByNameAsc(int districtID);
}

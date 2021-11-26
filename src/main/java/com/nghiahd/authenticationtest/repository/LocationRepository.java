package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.domain.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location,Integer>,LocationRepositoryCustom{
}

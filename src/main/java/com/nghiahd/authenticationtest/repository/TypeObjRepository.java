package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.domain.TypeObj;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeObjRepository extends JpaRepository<TypeObj,Integer>,TypeObjRepositoryCustom {
}

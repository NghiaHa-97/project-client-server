package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.domain.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<Permission,Integer>,PermissionRepositoryCustom {
}

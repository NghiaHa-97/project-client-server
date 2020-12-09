package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,Integer>,RoleRepositoryCustom {
}

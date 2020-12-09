package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.domain.Role;
import com.nghiahd.authenticationtest.repository.DTO.RequestPermissionRole;
import com.nghiahd.authenticationtest.repository.DTO.RequestUserRole;

import java.util.List;

public interface RoleRepositoryCustom {
    List<Role> findAllRoleById(Integer id);
    boolean deleteUserRole(RequestUserRole delete);
    boolean saveUserRole(RequestUserRole insert);
}

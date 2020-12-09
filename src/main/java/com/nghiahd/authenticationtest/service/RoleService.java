package com.nghiahd.authenticationtest.service;

import com.nghiahd.authenticationtest.domain.Role;
import com.nghiahd.authenticationtest.repository.DTO.RequestPermissionRole;
import com.nghiahd.authenticationtest.repository.DTO.RequestUserRole;
import org.springframework.http.ResponseEntity;


import java.util.List;

public interface RoleService {
    List<Role> findAllRoleById(Integer id);
    List<Role> getAllRole();
    boolean saveDeleteUserRole(List<RequestUserRole> list);
    boolean saveRole(String roleName);
    Boolean delete(String id);

    Boolean save(Role role);
}

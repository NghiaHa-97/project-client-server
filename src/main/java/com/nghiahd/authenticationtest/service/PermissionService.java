package com.nghiahd.authenticationtest.service;

import com.nghiahd.authenticationtest.domain.Permission;
import com.nghiahd.authenticationtest.repository.DTO.PermissionDetailDTO;
import com.nghiahd.authenticationtest.repository.DTO.RequestPermissionRole;
import com.nghiahd.authenticationtest.repository.DTO.RolePermissionDTO;
import com.nghiahd.authenticationtest.repository.DTO.UserPermissionDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PermissionService {
    List<Permission> getAllPermission();
    List<UserPermissionDTO> getUserPermissionDTO();
    Page<UserPermissionDTO> getUserPermissionDTOPage();
    List<RolePermissionDTO> getPermissionDetailByRoleId(int id);
    List<PermissionDetailDTO> getAllPermissionDetail();

    boolean saveDeletePermissionDetailRole(List<RequestPermissionRole> list);
    String getAllPermissionDetailCodeByUser(int id);

}

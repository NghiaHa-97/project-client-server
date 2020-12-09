package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.repository.DTO.PermissionDetailDTO;
import com.nghiahd.authenticationtest.repository.DTO.RequestPermissionRole;
import com.nghiahd.authenticationtest.repository.DTO.RolePermissionDTO;
import com.nghiahd.authenticationtest.repository.DTO.UserPermissionDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PermissionRepositoryCustom {
    List<UserPermissionDTO> getUserPermissionDTO();
    Page<UserPermissionDTO> getUserPermissionDTOPage();
    List<RolePermissionDTO> getPermissionDetailByRoleId(int id);
    List<PermissionDetailDTO> getAllPermissionDetail();
    boolean deletePermissionDetailRole(RequestPermissionRole delete);
    boolean savePermissionDetailRole(RequestPermissionRole insert);
    List<Integer> getAllPermissionDetailCodeByUser(int id);
}

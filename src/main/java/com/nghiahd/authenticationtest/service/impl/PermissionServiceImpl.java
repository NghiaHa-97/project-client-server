package com.nghiahd.authenticationtest.service.impl;

import com.nghiahd.authenticationtest.domain.Permission;
import com.nghiahd.authenticationtest.repository.DTO.PermissionDetailDTO;
import com.nghiahd.authenticationtest.repository.DTO.RequestPermissionRole;
import com.nghiahd.authenticationtest.repository.DTO.RolePermissionDTO;
import com.nghiahd.authenticationtest.repository.DTO.UserPermissionDTO;
import com.nghiahd.authenticationtest.repository.PermissionRepository;
import com.nghiahd.authenticationtest.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PermissionServiceImpl implements PermissionService {

    private PermissionRepository permissionRepository;

    @Autowired
    public PermissionServiceImpl(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    @Override
    public List<Permission> getAllPermission() {
        return permissionRepository.findAll();
    }

    @Override
    public List<UserPermissionDTO> getUserPermissionDTO() {
        return permissionRepository.getUserPermissionDTO();
    }

    @Override
    public Page<UserPermissionDTO> getUserPermissionDTOPage() {
        return permissionRepository.getUserPermissionDTOPage();
    }

    @Override
    public List<RolePermissionDTO> getPermissionDetailByRoleId(int id) {
        return permissionRepository.getPermissionDetailByRoleId(id);
    }

    @Override
    public List<PermissionDetailDTO> getAllPermissionDetail() {
        return permissionRepository.getAllPermissionDetail();
    }

    @Override
    public boolean saveDeletePermissionDetailRole(List<RequestPermissionRole> list) {
        List<RequestPermissionRole> delete=list.stream().filter(x->!x.isCheck).collect(Collectors.toList());
        List<RequestPermissionRole> insert=list.stream().filter(x->x.isCheck).collect(Collectors.toList());
        for (RequestPermissionRole item:delete) {
            permissionRepository.deletePermissionDetailRole(item);
        }

        for (RequestPermissionRole item: insert) {
            permissionRepository.savePermissionDetailRole(item);
        }
        return true;

    }

    @Override
    public String getAllPermissionDetailCodeByUser(int id) {
        List<Integer> codes=new ArrayList<>();
        codes=permissionRepository.getAllPermissionDetailCodeByUser(id);
        String result="";
        for (Integer i:codes){
            result+= (i+",");
        }
        return result;
    }
}

package com.nghiahd.authenticationtest.service.impl;

import com.google.common.base.Strings;
import com.nghiahd.authenticationtest.domain.Role;
import com.nghiahd.authenticationtest.repository.DTO.RequestPermissionRole;
import com.nghiahd.authenticationtest.repository.DTO.RequestUserRole;
import com.nghiahd.authenticationtest.repository.RoleRepository;
import com.nghiahd.authenticationtest.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {
    private RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository){
        this.roleRepository=roleRepository;
    }

    @Override
    public List<Role> findAllRoleById(Integer id) {
        return roleRepository.findAllRoleById(id);
    }

    @Override
    public List<Role> getAllRole() {
        return roleRepository.findAll();
    }

    @Override
    public boolean saveDeleteUserRole(List<RequestUserRole> list) {
        List<RequestUserRole> delete=list.stream().filter(x->!x.getCheck()).collect(Collectors.toList());
        List<RequestUserRole> insert=list.stream().filter(x->x.getCheck()).collect(Collectors.toList());
        for (RequestUserRole item:delete) {
            roleRepository.deleteUserRole(item);
        }

        for (RequestUserRole item: insert) {
            roleRepository.saveUserRole(item);
        }
        return true;
    }

    @Override
    public boolean saveRole(String roleName) {
        Role role=new Role();
        role.setId(0);
        role.setRoleName(roleName);
        roleRepository.save(role);
        return true;
    }

    @Override
    public Boolean delete(String id) {
        if(!Strings.isNullOrEmpty(id)){
            roleRepository.deleteById(Integer.parseInt(id));
            return true;
        }
        return false;
    }

    @Override
    public Boolean save(Role role) {
        roleRepository.save(role);

        return true;
    }
}

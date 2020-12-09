package com.nghiahd.authenticationtest.rest;

import com.google.common.base.Strings;
import com.nghiahd.authenticationtest.domain.Role;
import com.nghiahd.authenticationtest.domain.UserRole;
import com.nghiahd.authenticationtest.repository.DTO.RequestPermissionRole;
import com.nghiahd.authenticationtest.repository.DTO.RequestUserRole;
import com.nghiahd.authenticationtest.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(value = "/api")
public class RoleRest {

    private RoleService roleService;

    @Autowired
    public RoleRest(RoleService roleService){
        this.roleService=roleService;
    }

    @GetMapping(value = "/get-all-role-by-iduser")
    public ResponseEntity<List<Role>> getAllRoleById(@RequestParam String userId){
        if(!Strings.isNullOrEmpty(userId)){
            int id1= Integer.parseInt(userId);
            List<Role> list=roleService.findAllRoleById(id1);
            return new ResponseEntity<>(list , HttpStatus.OK);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }

    @GetMapping(value = "/get-all-role")
    public ResponseEntity<List<Role>> getAllRole(){

        return new ResponseEntity<>(roleService.getAllRole(),HttpStatus.OK);
    }
    @PostMapping(value = "/save-user-role")
    public boolean saveUserRole(@RequestBody List<RequestUserRole> requests){
        return roleService.saveDeleteUserRole(requests);
    }

    @GetMapping(value = "/save-role")
    public boolean saveRole(@RequestParam String roleName){

        return roleService.saveRole(roleName);
    }

    @DeleteMapping(value = "/role/delete")
    public ResponseEntity<Boolean> delete(@RequestParam String id){

        return  new ResponseEntity<>(roleService.delete(id),HttpStatus.OK);
    }

    @PostMapping(value = "/role/save")
    public ResponseEntity<Boolean> save(@RequestBody Role role){

        return  new ResponseEntity<>(roleService.save(role),HttpStatus.OK);
    }
}

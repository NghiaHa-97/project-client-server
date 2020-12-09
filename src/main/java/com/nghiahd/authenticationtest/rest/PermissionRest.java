package com.nghiahd.authenticationtest.rest;

import com.fasterxml.jackson.core.io.JsonEOFException;
import com.nghiahd.authenticationtest.domain.Permission;
import com.nghiahd.authenticationtest.domain.PermissionDetail;
import com.nghiahd.authenticationtest.repository.DTO.PermissionDetailDTO;
import com.nghiahd.authenticationtest.repository.DTO.RequestPermissionRole;
import com.nghiahd.authenticationtest.repository.DTO.RolePermissionDTO;
import com.nghiahd.authenticationtest.repository.DTO.UserPermissionDTO;
import com.nghiahd.authenticationtest.service.PermissionService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(value = "/api")
public class PermissionRest {

    private final PermissionService permissionService;

    @Autowired
    public PermissionRest(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping(value = "/get-all-permission")
    public List<Permission> getAllPermission(){
        return permissionService.getAllPermission();
    }

    @GetMapping(value = "/get-all-permissiondetail")
    public List<PermissionDetail> getAllPermissionDetail(){
        List<PermissionDetail> permissionDetails=new ArrayList<>(permissionService.getAllPermission().get(0).getPermissionDetails());
        return permissionDetails;
    }

    @GetMapping(value = "/get-all-user-permission-dto")
    public List<UserPermissionDTO> getUserPermissionDTO(){
        List<UserPermissionDTO> userPermissionDTOS=permissionService.getUserPermissionDTO();
        return userPermissionDTOS;
    }

    @GetMapping(value = "/get-all-user-permission-dto-page")
    public Page<UserPermissionDTO> getUserPermissionDTOPage(){
        Page<UserPermissionDTO> userPermissionDTOS=permissionService.getUserPermissionDTOPage();
        return userPermissionDTOS;
    }

    @GetMapping(value = "/get-all-permission-by-roleid-dto-page/{id}")
    public List<RolePermissionDTO> getPermissionDetailByRoleId(@PathVariable Integer id){
        List<RolePermissionDTO> rolePermissionDTO=permissionService.getPermissionDetailByRoleId(id);
        return rolePermissionDTO;
    }


    @GetMapping(value = "/get-all-permission-detail")
    public List<PermissionDetailDTO> getAllPermissionDetailDTO(){
        List<PermissionDetailDTO> permissionDetailDTOS=permissionService.getAllPermissionDetail();
        return permissionDetailDTOS;
    }

    @PostMapping(value = "/save-permission-detail-role")
    public boolean savePermissionDetailRole(@RequestBody List<RequestPermissionRole> requests){
        return permissionService.saveDeletePermissionDetailRole(requests);
    }

    @GetMapping(value = "/get-all-permissiondetail-code-by-user")
    public String getAllPermissionDetailCodeByUser(@RequestParam String id) {
        int id1 = Integer.parseInt(id);
        String s = permissionService.getAllPermissionDetailCodeByUser(id1);
        return JSONObject.quote(s);
    }
}

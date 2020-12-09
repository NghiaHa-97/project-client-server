package com.nghiahd.authenticationtest.repository.DTO;

public class RequestPermissionRole {
    public Integer permissionDetaiId;
    public Integer roleId;
    public Boolean isCheck;

    public RequestPermissionRole(Integer permissionDetaiId, Integer roleId, Boolean isCheck) {
        this.permissionDetaiId = permissionDetaiId;
        this.roleId = roleId;
        this.isCheck = isCheck;
    }

    public RequestPermissionRole() {
    }

    public Integer getPermissionDetaiId() {
        return permissionDetaiId;
    }

    public void setPermissionDetaiId(Integer permissionDetaiId) {
        this.permissionDetaiId = permissionDetaiId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Boolean getCheck() {
        return isCheck;
    }

    public void setCheck(Boolean check) {
        isCheck = check;
    }
}

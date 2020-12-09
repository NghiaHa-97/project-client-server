package com.nghiahd.authenticationtest.repository.DTO;

public class RequestUserRole {
    private Integer roleId;
    private Integer userId;
    private Boolean check;

    public RequestUserRole(Integer roleId, Integer userId) {
        this.roleId = roleId;
        this.userId = userId;
    }

    public RequestUserRole() {
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Boolean getCheck() {
        return check;
    }

    public void setCheck(Boolean check) {
        this.check = check;
    }
}

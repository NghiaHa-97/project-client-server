package com.nghiahd.authenticationtest.repository.DTO;

public class UserPermissionDTO {
    private String userName;
    private String roleName;
    private String name;
    private String code;

    public UserPermissionDTO() {
    }

    public UserPermissionDTO(String userName, String roleName, String name, String code) {
        this.userName = userName;
        this.roleName = roleName;
        this.name = name;
        this.code = code;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}

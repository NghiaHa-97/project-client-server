package com.nghiahd.authenticationtest.repository.DTO;

public class RolePermissionDTO {
    private Integer id;
    private String roleName;
    private Integer  permissionId;
    private String permissionName;
    private String permissionCode;
    private Integer permissionDetailId;
    private String permissionDetailCode;
    private String permissionDetailName;

    public RolePermissionDTO() {
    }

    public RolePermissionDTO(Integer id, String roleName, Integer permissionId, String permissionName, String permissionCode, Integer permissionDetailId, String permissionDetailCode, String permissionDetailName) {
        this.id = id;
        this.roleName = roleName;
        this.permissionId = permissionId;
        this.permissionName = permissionName;
        this.permissionCode = permissionCode;
        this.permissionDetailId = permissionDetailId;
        this.permissionDetailCode = permissionDetailCode;
        this.permissionDetailName = permissionDetailName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Integer getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(Integer permissionId) {
        this.permissionId = permissionId;
    }

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }

    public String getPermissionCode() {
        return permissionCode;
    }

    public void setPermissionCode(String permissionCode) {
        this.permissionCode = permissionCode;
    }

    public Integer getPermissionDetailId() {
        return permissionDetailId;
    }

    public void setPermissionDetailId(Integer permissionDetailId) {
        this.permissionDetailId = permissionDetailId;
    }

    public String getPermissionDetailCode() {
        return permissionDetailCode;
    }

    public void setPermissionDetailCode(String permissionDetailCode) {
        this.permissionDetailCode = permissionDetailCode;
    }

    public String getPermissionDetailName() {
        return permissionDetailName;
    }

    public void setPermissionDetailName(String permissionDetailName) {
        this.permissionDetailName = permissionDetailName;
    }
}

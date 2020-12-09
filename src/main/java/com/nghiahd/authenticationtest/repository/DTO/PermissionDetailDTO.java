package com.nghiahd.authenticationtest.repository.DTO;

public class PermissionDetailDTO {
    private Integer  permissionId;
    private String permissionName;
    private String permissionCode;
    private Integer permissionDetailId;
    private String permissionDetailCode;
    private String permissionDetailName;

    public PermissionDetailDTO(Integer permissionId, String permissionName, String permissionCode, Integer permissionDetailId, String permissionDetailCode, String permissionDetailName) {
        this.permissionId = permissionId;
        this.permissionName = permissionName;
        this.permissionCode = permissionCode;
        this.permissionDetailId = permissionDetailId;
        this.permissionDetailCode = permissionDetailCode;
        this.permissionDetailName = permissionDetailName;
    }

    public PermissionDetailDTO() {
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

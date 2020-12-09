package com.nghiahd.authenticationtest.repository.DTO;

public class AdminAndIdDTO {
    private Boolean admin;
    private Integer id;

    public AdminAndIdDTO(Boolean admin, Integer id) {
        this.admin = admin;
        this.id = id;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public AdminAndIdDTO() {
    }
}

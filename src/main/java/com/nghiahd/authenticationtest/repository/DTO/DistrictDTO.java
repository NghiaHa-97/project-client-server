package com.nghiahd.authenticationtest.repository.DTO;

public class DistrictDTO {

    private Integer id;
    private String name;
    private String cityProvinceID;

    public DistrictDTO() {

    }

    public DistrictDTO(Integer id, String name, String cityProvinceID) {
        this.id = id;
        this.name = name;
        this.cityProvinceID = cityProvinceID;
    }
}

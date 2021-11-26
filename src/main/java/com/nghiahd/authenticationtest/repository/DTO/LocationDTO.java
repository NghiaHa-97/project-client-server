package com.nghiahd.authenticationtest.repository.DTO;

import java.math.BigDecimal;

public class LocationDTO {

    private int typeObjId;
    private String name;
    private BigDecimal longitude;
    private BigDecimal latitude;
    private String description;

    public LocationDTO() {
    }

    public LocationDTO(int typeObjId, String name, BigDecimal longitude, BigDecimal latitude, String description) {
        this.typeObjId = typeObjId;
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.description = description;
    }

    public int getTypeObjId() {
        return typeObjId;
    }

    public void setTypeObjId(int typeObjId) {
        this.typeObjId = typeObjId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

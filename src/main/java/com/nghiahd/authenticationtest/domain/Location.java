package com.nghiahd.authenticationtest.domain;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "location")
public class Location {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "typeobjid")
    private Integer typeObjID;

    @Column(name = "name")
    private String name;

    @Column(name = "longitude")
    private BigDecimal longitude;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "description")
    private String description;

    @Column(name = "cityprovinceid")
    private Integer cityProvinceID;

    @Column(name = "districtid")
    private Integer districtID;

    @Column(name = "communewardid")
    private Integer communeWardID;

    public Location() {
    }

    public Location(UUID id, Integer typeObjID, String name, BigDecimal longitude, BigDecimal latitude, String description, Integer cityProvinceID, Integer districtID, Integer communeWardID) {
        this.id = id;
        this.typeObjID = typeObjID;
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.description = description;
        this.cityProvinceID = cityProvinceID;
        this.districtID = districtID;
        this.communeWardID = communeWardID;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Integer getTypeObjID() {
        return typeObjID;
    }

    public void setTypeObjID(Integer typeObjID) {
        this.typeObjID = typeObjID;
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

    public Integer getCityProvinceID() {
        return cityProvinceID;
    }

    public void setCityProvinceID(Integer cityProvinceID) {
        this.cityProvinceID = cityProvinceID;
    }

    public Integer getDistrictID() {
        return districtID;
    }

    public void setDistrictID(Integer districtID) {
        this.districtID = districtID;
    }

    public Integer getCommuneWardID() {
        return communeWardID;
    }

    public void setCommuneWardID(Integer communeWardID) {
        this.communeWardID = communeWardID;
    }
}
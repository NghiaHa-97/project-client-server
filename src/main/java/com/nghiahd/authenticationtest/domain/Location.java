package com.nghiahd.authenticationtest.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
@Builder
@Entity
@Table(name = "Location")
public class Location {

    @Id
    @Column(name = "Id")
    private UUID id;

    @Column(name = "TypeObjId")
    private int typeObjId;

    @Column(name = "name")
    private String name;

    @Column(name = "Longitude")
    private BigDecimal longitude;

    @Column(name = "Latitude")
    private BigDecimal latitude;

    @Column(name = "Description")
    private String description;

}

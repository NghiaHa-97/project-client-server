package com.nghiahd.authenticationtest.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Builder
@Entity
@Table(name = "TypeObj")
public class TypeObj {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "Icon")
    private String icon;

    @Column(name = "Description")
    private String description;

}

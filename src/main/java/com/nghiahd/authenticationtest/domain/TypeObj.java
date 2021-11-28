package com.nghiahd.authenticationtest.domain;

import javax.persistence.*;

@Entity
@Table(name = "typeobj")
public class TypeObj {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "icon")
    private String icon;

    @Column(name = "description")
    private String description;

    public TypeObj() {
    }

    public TypeObj(Integer id, String icon, String description) {
        this.id = id;
        this.icon = icon;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

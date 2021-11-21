package com.nghiahd.authenticationtest.repository.impl;

import com.nghiahd.authenticationtest.repository.LocationRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class LocationRepositoryImpl implements LocationRepositoryCustom {
    @Autowired
    @PersistenceContext(unitName = "entityManagerFactory")
    private EntityManager entityManager;

}

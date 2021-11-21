package com.nghiahd.authenticationtest.repository.impl;

import com.nghiahd.authenticationtest.repository.TypeObjRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class TypeObjRepositoryImpl implements TypeObjRepositoryCustom {
    @Autowired
    @PersistenceContext(unitName = "entityManagerFactory")
    private EntityManager entityManager;

}

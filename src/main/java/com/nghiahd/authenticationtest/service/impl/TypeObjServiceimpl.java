package com.nghiahd.authenticationtest.service.impl;

import com.nghiahd.authenticationtest.domain.TypeObj;
import com.nghiahd.authenticationtest.repository.TypeObjRepository;
import com.nghiahd.authenticationtest.service.TypeObjService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TypeObjServiceimpl implements TypeObjService {

    private final TypeObjRepository typeObjRepository;

    public TypeObjServiceimpl(TypeObjRepository typeObjRepository) {
        this.typeObjRepository = typeObjRepository;
    }

    @Override
    public List<TypeObj> getAllTypeObj() {
        return typeObjRepository.findAll(Sort.by(Sort.Direction.ASC, "icon"));
    }
}

package com.nghiahd.authenticationtest.rest;

import com.nghiahd.authenticationtest.domain.TypeObj;
import com.nghiahd.authenticationtest.service.TypeObjService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/type-obj")
public class TypeObjRest {

    private final TypeObjService typeObjService;

    public TypeObjRest(TypeObjService typeObjService) {
        this.typeObjService = typeObjService;
    }

    @GetMapping()
    public ResponseEntity<List<TypeObj>> getAllTypeObj() {
        return new ResponseEntity<>(typeObjService.getAllTypeObj(), HttpStatus.OK);
    }
}

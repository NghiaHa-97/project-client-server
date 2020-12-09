package com.nghiahd.authenticationtest.rest;

import com.nghiahd.authenticationtest.domain.MonHoc;
import com.nghiahd.authenticationtest.service.MonHocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200",maxAge = 3600)
@RestController
@RequestMapping("/api")
public class MonHocRest {

    @Autowired
    MonHocService monHocService;


    @GetMapping(value = "/mon-hoc/get-page-mon-hoc")
    public ResponseEntity<List<MonHoc>> getPageMonHoc(Pageable pageable, @RequestParam (required = false) String search){
        Page<MonHoc> page=monHocService.getPageMonHoc(pageable,search);
        if(page.getContent().size()>0){
            return new ResponseEntity<>(page.getContent(), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(value = "/mon-hoc/delete/{id}")
    public void deletdMonHoc( @PathVariable Integer id){

        monHocService.delete(id);
    }

    @PostMapping(value="/mon-hoc/save")
    public void save( @RequestBody MonHoc monhoc){

        monHocService.save(monhoc);
    }

    @GetMapping(value = "/mon-hoc/getById/{id}")
    public ResponseEntity<MonHoc> getPageMonHoc( @PathVariable Integer id){
        MonHoc mh=monHocService.getById(id);
        return new ResponseEntity<>(mh, HttpStatus.OK);
    }

}

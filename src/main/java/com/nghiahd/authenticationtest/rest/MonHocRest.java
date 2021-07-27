//package com.nghiahd.authenticationtest.rest;
//
//import com.nghiahd.authenticationtest.common.Common;
//import com.nghiahd.authenticationtest.domain.test.MonHoc;
//import com.nghiahd.authenticationtest.domain.test.PhanCong;
//import com.nghiahd.authenticationtest.service.MonHocService;
//import com.nghiahd.authenticationtest.service.PhanCongService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@CrossOrigin(origins = "http://localhost:4200",maxAge = 3600)
//@RestController
//@RequestMapping("/api")
//public class MonHocRest {
//
//    @Autowired
//    MonHocService monHocService;
//
//    @Autowired
//    PhanCongService phanCongService;
//
//
//    @GetMapping(value = "/mon-hoc/get-page-mon-hoc")
//    public ResponseEntity<List<MonHoc>> getPageMonHoc(Pageable pageable, @RequestParam (required = false) String search){
//        Page<MonHoc> page=monHocService.getPageMonHoc(pageable,search);
//        HttpHeaders headers=new HttpHeaders();
//        Common.setHeaders(headers,page);
//        if(page.getContent().size()>0){
//            return new ResponseEntity<>(page.getContent(),headers, HttpStatus.OK);
//        }
//        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//    }
//
//    @DeleteMapping(value = "/mon-hoc/delete/{id}")
//    public void deletdMonHoc( @PathVariable Integer id){
//
//        monHocService.delete(id);
//    }
//
//    @PostMapping(value="/mon-hoc/save")
//    public void save( @RequestBody MonHoc monhoc){
//
//        monHocService.save(monhoc);
//    }
//
//    @GetMapping(value = "/mon-hoc/getById/{id}")
//    public ResponseEntity<MonHoc> getPageMonHoc( @PathVariable Integer id){
//        MonHoc mh=monHocService.getById(id);
//        return new ResponseEntity<>(mh, HttpStatus.OK);
//    }
//        ///mon-hoc/savephancong
//
//    @PostMapping(value="/mon-hoc/savephancong")
//    public void save( @RequestBody List<PhanCong> phanCongs){
//        if(phanCongs.size()>0){
//            monHocService.deletePhanCong(phanCongs.get(0).getMonHocId(),phanCongs.get(0).getNamHoc());
//           phanCongService.savePhanCong(phanCongs);
//        }
//
//
//    }
//
//
//
//
//}

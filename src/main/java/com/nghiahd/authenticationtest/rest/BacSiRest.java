package com.nghiahd.authenticationtest.rest;

import com.nghiahd.authenticationtest.common.Common;
import com.nghiahd.authenticationtest.domain.*;
import com.nghiahd.authenticationtest.repository.DTO.BacSiDTO;
import com.nghiahd.authenticationtest.repository.DTO.FileName;
import com.nghiahd.authenticationtest.repository.DTO.ResultChuanDoan;
import com.nghiahd.authenticationtest.service.BacSiService;
import com.nghiahd.authenticationtest.service.FileService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/bac-si")
public class BacSiRest {
    private final BacSiService bacSiService;
    private final FileService fileService;

    public BacSiRest(BacSiService bacSiService,
                     FileService fileService) {
        this.bacSiService = bacSiService;
        this.fileService = fileService;
    }

    @GetMapping(value = "/page-bac-si")
    public ResponseEntity<List<BacSiDTO>> getAllBacSi(Pageable pageable, @RequestParam(required = false) String search) {
        Page<BacSiDTO> page = null;
        HttpHeaders headers = new HttpHeaders();
        try {
            page = bacSiService.getPage(pageable, search);
            Common.setHeaders(headers, page);
            if (CollectionUtils.isEmpty(page.getContent()))  {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    @GetMapping(value = "/get-by-id/{id}")
    public BacSi grtById(@PathVariable Integer id) {
        return bacSiService.findOne(id);
    }

    //tett file
    @PostMapping(value = "/upload")
    public ResponseEntity<FileName> uploadFile(@RequestBody MultipartFile file) throws IOException {

        String fileName= fileService.save(file);

        return new ResponseEntity<>(new FileName(fileName),HttpStatus.OK);
    }

    @PostMapping(value = "/save")
    public BacSi save(@RequestBody BacSi bacSi) {

        if(bacSi.getId()!=null){
            for (BacSiNgoaiNgu item:bacSi.getBacSiNgoaiNgu()){
                item.setBacSiId(bacSi.getId());
            }
        }else {
            bacSi.setId(0);
            for (BacSiNgoaiNgu item:bacSi.getBacSiNgoaiNgu()){
                item.setId(0);
            }
            for (ChungChi item:bacSi.getChungChi()){
                item.setId(0);

            }
            for (KinhNghiem item:bacSi.getKinhNghiem()){
                item.setId(0);
            }
        }
        return bacSiService.save(bacSi);
    }

    @GetMapping(value = "/page-bieu-hien")
    public ResponseEntity<List<BieuHien>> getAllBieuHien(Pageable pageable, @RequestParam(required = false) String search) {
        Page<BieuHien> page = null;
        HttpHeaders headers = new HttpHeaders();
        try {
            page = bacSiService.getPageBieuHien(pageable, search);
            Common.setHeaders(headers, page);
            if (CollectionUtils.isEmpty(page.getContent()))  {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @PostMapping(value = "/chuan-doan")
    public ResponseEntity<List<ResultChuanDoan>> getResultChuanDoan(@RequestBody List<Integer> listId) {

        List <ResultChuanDoan> result= bacSiService.getChuanDoan(listId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}

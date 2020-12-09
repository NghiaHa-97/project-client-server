package com.nghiahd.authenticationtest.rest;

import com.nghiahd.authenticationtest.common.Common;
import com.nghiahd.authenticationtest.repository.DTO.NguoiDungCTDTO;
import com.nghiahd.authenticationtest.repository.DTO.SanPhamDTO;
import com.nghiahd.authenticationtest.repository.DTO.ShoppingCartDTO;
import com.nghiahd.authenticationtest.service.FileService;
import com.nghiahd.authenticationtest.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class SanPhamRest {



    @Autowired
    SanPhamService sanPhamService;

    @Autowired
    FileService fileService;

    @GetMapping(value = "/sanpham/get-page-san-pham")
    public ResponseEntity<List<SanPhamDTO>> getAllUserDetails(Pageable pageable, @RequestParam(required = false) String search){


//        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
//                .getPrincipal();
//        String username = userDetails.getUsername();
//
//        System.out.println("username:"+username);

        Page<SanPhamDTO> page=sanPhamService.getPageSanPham(pageable,search);
        HttpHeaders headers = new HttpHeaders();

        Common.setHeaders(headers,page);

        return new ResponseEntity<>(page.getContent(),headers, HttpStatus.OK);
    }


    @PostMapping(value = "/sanpham/get-data-gio-hang")
    public ResponseEntity<List<SanPhamDTO>> getListSanPhamByListId( @RequestBody List<ShoppingCartDTO> shoppingCartDTO){


//        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
//                .getPrincipal();
//        String username = userDetails.getUsername();
//
//        System.out.println("username:"+username);
        List<Integer> ids=shoppingCartDTO.stream().map(x->x.getIdSp()).collect(Collectors.toList());
        List<SanPhamDTO> list=sanPhamService.getListSanPhamByListId(ids);


        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    //tett file
    @PostMapping(value = "/upload")
    public ResponseEntity<Boolean> uploadFile(@RequestBody MultipartFile file) throws IOException {

        fileService.save(file);
        return new ResponseEntity<>(true,HttpStatus.OK);
    }

}

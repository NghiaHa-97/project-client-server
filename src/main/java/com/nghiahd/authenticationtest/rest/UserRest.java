package com.nghiahd.authenticationtest.rest;

import com.nghiahd.authenticationtest.common.Common;
import com.nghiahd.authenticationtest.config.jwt.JwtTokenUtil;
import com.nghiahd.authenticationtest.config.jwt.JwtUserDetailService;
import com.nghiahd.authenticationtest.domain.UserAccount;
import com.nghiahd.authenticationtest.repository.DTO.*;
import com.nghiahd.authenticationtest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Column;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserRest {

    @Autowired
    UserService userService;

    @Autowired
    JwtUserDetailService jwtUserDetailService;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping(value = "/user/login")
    public boolean checkUser(@RequestBody UserDTO userDTO){

        return userService.checkUser(userDTO);
    }

    @PostMapping(value = "/user/get-isadmin")
    public AdminAndIdDTO checkAdmin(@RequestBody UserDTO userDTO){

        return userService.checkAdmin(userDTO);
    }

    @GetMapping(value = "/user/get-all-user")
    public List<UserAccount> getAllUser(){

        return userService.getAllUser();
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<AuthenticationResponse> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }


        final UserDetails userDetails = jwtUserDetailService
                .loadUserByUsername(authenticationRequest.getUsername());

        final  String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt, authenticationRequest.getUsername()));
    }

    @GetMapping(value = "/user/get-all-user-details")
    public ResponseEntity<List<NguoiDungCTDTO>> getAllUserDetails(Pageable pageable, @RequestParam (required = false) String search){


        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = userDetails.getUsername();

        System.out.println("username:"+username);

        Page<NguoiDungCTDTO> page=userService.getAllUserDetails(pageable,search);
        HttpHeaders headers = new HttpHeaders();
        Common.setHeaders(headers,page);
        return new ResponseEntity<>(page.getContent(),headers, HttpStatus.OK);
    }

    @PostMapping(value = "/user/save")
    public ResponseEntity<Boolean> save(@RequestBody NguoiDungCTDTO nguoiDungCTDTO){
        UserAccount userAccount=new UserAccount();
        userAccount.setId(nguoiDungCTDTO.getUserId());
        userAccount.getNguoiDungCT().setId(nguoiDungCTDTO.getUserDetailId());
        userAccount.setUserName(nguoiDungCTDTO.getUserName());
        userAccount.setPassword(nguoiDungCTDTO.getPassword());
        userAccount.getNguoiDungCT().setHoTen(nguoiDungCTDTO.getHoTen());
        userAccount.getNguoiDungCT().setGioiTinh(nguoiDungCTDTO.getGioiTinh());
        userAccount.getNguoiDungCT().setNgaySinh(nguoiDungCTDTO.getNgaySinh());
        userAccount.getNguoiDungCT().setDiaChi(nguoiDungCTDTO.getDiaChi());
        userAccount.getNguoiDungCT().setTaiKhoan(nguoiDungCTDTO.getTaiKhoan());
        userAccount.getNguoiDungCT().setSdt(nguoiDungCTDTO.getSdt());
        userAccount.getNguoiDungCT().setEmail(nguoiDungCTDTO.getEmail());
        boolean result =userService.saveUserDetail(userAccount);

        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    ///user/findbyid

    @GetMapping(value = "/user/findbyid")
    public ResponseEntity<NguoiDungCTDTO> findById(@RequestParam (required = false) String userId){
        if(userId!=null){
            NguoiDungCTDTO nguoiDungCTDTO=userService.findById(Integer.parseInt(userId));
            return new ResponseEntity<>(nguoiDungCTDTO, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @DeleteMapping(value = "/user/delete")
    public ResponseEntity<Boolean> delete(@RequestParam String userId){
        if(userId!=null){
            userService.delete(Integer.parseInt(userId));
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }
}

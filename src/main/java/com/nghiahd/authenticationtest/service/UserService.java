package com.nghiahd.authenticationtest.service;

import com.nghiahd.authenticationtest.domain.UserAccount;
import com.nghiahd.authenticationtest.repository.DTO.AdminAndIdDTO;
import com.nghiahd.authenticationtest.repository.DTO.NguoiDungCTDTO;
import com.nghiahd.authenticationtest.repository.DTO.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface UserService {
    boolean checkUser(UserDTO userDTO);
    AdminAndIdDTO checkAdmin(UserDTO userDTO);
    List<UserAccount> getAllUser();
    Page<NguoiDungCTDTO> getAllUserDetails(Pageable pageable, String userName_hoTen);
    boolean saveUserDetail(UserAccount userAccount);
    NguoiDungCTDTO findById(Integer id);
    List<String> getUserNameIsRoleAdmin();
    void delete(Integer usetId);
}

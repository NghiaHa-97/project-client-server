package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.repository.DTO.AdminAndIdDTO;
import com.nghiahd.authenticationtest.repository.DTO.NguoiDungCTDTO;
import com.nghiahd.authenticationtest.repository.DTO.UserDetailDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserRepositoryCustom {
    Boolean checkUser(String userName,String password);
    AdminAndIdDTO checkAdmin(String userName, String password);
    UserDetailDTO getUserDetailByUserName(String userName);
    Page<NguoiDungCTDTO> getAllUserDetails(Pageable pageable, String userName_hoTen);
    List<String> getUserNameIsRoleAdmin();
}

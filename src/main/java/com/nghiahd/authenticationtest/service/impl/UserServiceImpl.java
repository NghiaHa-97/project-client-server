package com.nghiahd.authenticationtest.service.impl;

import com.nghiahd.authenticationtest.domain.UserAccount;
import com.nghiahd.authenticationtest.repository.DTO.AdminAndIdDTO;
import com.nghiahd.authenticationtest.repository.DTO.NguoiDungCTDTO;
import com.nghiahd.authenticationtest.repository.DTO.UserDTO;
import com.nghiahd.authenticationtest.repository.DTO.UserDetailDTO;
import com.nghiahd.authenticationtest.repository.UserRepository;
import com.nghiahd.authenticationtest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean checkUser(UserDTO userDTO) {
        return userRepository.checkUser(userDTO.getUserName(),userDTO.getPassword());
    }

    @Override
    public AdminAndIdDTO checkAdmin(UserDTO userDTO) {
        return userRepository.checkAdmin(userDTO.getUserName(),userDTO.getPassword());

    }

    @Override
    public List<UserAccount> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public Page<NguoiDungCTDTO> getAllUserDetails(Pageable pageable, String userName_hoTen) {
        return userRepository.getAllUserDetails(pageable,userName_hoTen);
    }

    @Override
    public boolean saveUserDetail(UserAccount userAccount){
        try {
            userRepository.save(userAccount);
            return true;
        }catch (Exception e){
            return false;
        }

    }

    @Override
    public NguoiDungCTDTO findById(Integer id) {
        UserAccount userAccount= userRepository.findById(id).get();
        NguoiDungCTDTO nguoiDungCTDTO=new NguoiDungCTDTO(userAccount.getId()
                , userAccount.getUserName(),
                null,
                userAccount.getNguoiDungCT().getId(),
                userAccount.getNguoiDungCT().getHoTen(),
                userAccount.getNguoiDungCT().getGioiTinh(),
                userAccount.getNguoiDungCT().getNgaySinh(),
                userAccount.getNguoiDungCT().getDiaChi(),
                userAccount.getNguoiDungCT().getTaiKhoan(),
                userAccount.getNguoiDungCT().getSdt(),
                userAccount.getNguoiDungCT().getEmail());
        return nguoiDungCTDTO;
    }

    @Override
    public void delete(Integer userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public List<String> getUserNameIsRoleAdmin() {
        return userRepository.getUserNameIsRoleAdmin();
    }
}

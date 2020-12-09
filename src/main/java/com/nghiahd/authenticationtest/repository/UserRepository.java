package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.domain.UserAccount;
import com.nghiahd.authenticationtest.repository.DTO.UserDetailDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserAccount,Integer>, UserRepositoryCustom {


}

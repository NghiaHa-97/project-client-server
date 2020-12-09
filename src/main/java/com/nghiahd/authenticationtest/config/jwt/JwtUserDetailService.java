package com.nghiahd.authenticationtest.config.jwt;

import com.nghiahd.authenticationtest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        UserDetails userDetails= userRepository.getUserDetailByUserName(userName);
//        return new User(userDetails.getUsername().trim(), userDetails.getPassword().trim(),
//                new ArrayList<>());
        return userDetails;
    }
}

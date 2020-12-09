package com.nghiahd.authenticationtest.repository.DTO;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserDetailDTO implements UserDetails {
    private  Integer id;
    private  String username;
    private  String password;
    private  Collection<? extends GrantedAuthority> authorities;

    public UserDetailDTO() {
    }

    public UserDetailDTO(Integer id, String username, String password) {
        this.id = id;
        this.username = username.trim();
        this.password = password.trim();
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

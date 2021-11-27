package com.nghiahd.authenticationtest.repository.impl;
import com.google.common.base.Strings;
import com.nghiahd.authenticationtest.common.Common;
import com.nghiahd.authenticationtest.repository.DTO.AdminAndIdDTO;
import com.nghiahd.authenticationtest.repository.DTO.NguoiDungCTDTO;
import com.nghiahd.authenticationtest.repository.DTO.UserDetailDTO;
import com.nghiahd.authenticationtest.repository.UserRepositoryCustom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserRepositoryImpl implements UserRepositoryCustom {

    @Autowired
    EntityManager entityManager;

    @Override
    public Boolean checkUser(String userName, String password) {
        StringBuilder sql= new StringBuilder();
        int x=0;
        sql.append(" SELECT COUNT(1) " +
                " FROM dbo.[User] " +
                " WHERE UserName = :userName AND Password = :password ");
        Query query=entityManager.createNativeQuery(sql.toString());
        query.setParameter("userName",userName);
        query.setParameter("password",password);

        x= (int) query.getSingleResult();

        return x==1;
    }


    @Override
    public AdminAndIdDTO checkAdmin(String userName, String password) {
        StringBuilder sql= new StringBuilder();
        int x=0;
        sql.append(" SELECT isAdmin as admin , id " +
                " FROM dbo.[User] " +
                " WHERE UserName = :userName AND Password = :password ");
        Query query=entityManager.createNativeQuery(sql.toString(),"AdminAndIdDTO");
        query.setParameter("userName",userName);
        query.setParameter("password",password);

        AdminAndIdDTO result= (AdminAndIdDTO) query.getSingleResult();

        return result;
    }

    @Override
    public UserDetailDTO getUserDetailByUserName(String userName) {
        StringBuilder sql= new StringBuilder();

        sql.append(" SELECT u.id , u.UserName , u.Password " +
                " FROM dbo.[User] as u " +
                " WHERE u.UserName = :userName ");

        Query query=entityManager.createNativeQuery(sql.toString(),"UserDetailDTO");
        query.setParameter("userName",userName);

        UserDetailDTO result= (UserDetailDTO) query.getSingleResult();

        return result;
    }

    @Override
    public Page<NguoiDungCTDTO> getAllUserDetails(Pageable pageable, String userName_hoTen) {
        StringBuilder sql= new StringBuilder();
        Map<String,Object> param=new HashMap<>();
        sql.append(" FROM dbo.[User] a FULL JOIN dbo.NguoiDungCT b ON b.id = a.NguoiDungCTId    ");

        if(!Strings.isNullOrEmpty(userName_hoTen)){
            sql.append( " WHERE a.UserName LIKE :search OR b.HoTen LIKE :search ");
            param.put("search","%"+userName_hoTen+"%");
        }
        Number total=0;
        String select="    SELECT a.id userId,      " +
                        "a.UserName userName,      " +
                        "(CASE  " +
                        " WHEN (EXISTS  (SELECT r.id " +
                        " FROM  dbo.UserRole r " +
                        " WHERE r.RoleId=2 AND r.UserId=a.id)) THEN 1 " +
                        "  ELSE 0 " +
                        "END) AS admin,      " +
                        "b.id userDetailId,      " +
                        "b.HoTen hoTen,      " +
                        "b.GioiTinh gioiTinh,      " +
                        "b.NgaySinh ngaySinh,b.DiaChi diaChi,b.TaiKhoan taiKhoan,b.SDT sdt,b.Email email     " ;

        Query queryCount=entityManager.createNativeQuery("select count(1) " + sql.toString());
        Common.setParams(queryCount,param);

        total=(Number)queryCount.getSingleResult();

        if(total.intValue()>0){
            Query query=entityManager.createNativeQuery(select + sql.toString(),"NguoiDungCTDTO");
            Common.setParamsWithPageable(query,param,pageable,total);

            return new PageImpl<>(query.getResultList(),pageable,total.longValue());
        }


        return new PageImpl<>(new ArrayList<>());

    }

    @Override
    public List<String> getUserNameIsRoleAdmin() {
        StringBuilder sql= new StringBuilder();
        Map<String,Object> param=new HashMap<>();
        sql.append("  FROM dbo.Role r LEFT JOIN dbo.UserRole ON UserRole.RoleId = r.id " +
                " LEFT JOIN dbo.[User] u ON u.id = UserRole.UserId   ");


        sql.append( " WHERE r.rolename like 'admin' ");


        Number total=0;
        String select="    SELECT     " +
                " u.UserName userName   " ;

        Query query=entityManager.createNativeQuery(select + sql.toString());
        return query.getResultList();
    }
}



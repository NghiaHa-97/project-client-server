package com.nghiahd.authenticationtest.repository.impl;

import com.nghiahd.authenticationtest.domain.Role;
import com.nghiahd.authenticationtest.repository.DTO.AdminAndIdDTO;
import com.nghiahd.authenticationtest.repository.DTO.RequestUserRole;
import com.nghiahd.authenticationtest.repository.RoleRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

public class RoleRepositoryImpl implements RoleRepositoryCustom {
    @Autowired
    //@PersistenceContext(unitName = "entityManagerFactory")
    private EntityManager entityManager;

    @Override
    public List<Role> findAllRoleById(Integer id) {
        StringBuilder sql= new StringBuilder();
        List<Role> roles=new ArrayList<>();
        sql.append("    SELECT dbo.Role.*   " +
                "   FROM dbo.[User] LEFT JOIN dbo.UserRole ON UserRole.UserId = [User].id   " +
                "   LEFT JOIN dbo.Role ON Role.id = UserRole.RoleId    " +
                "   WHERE dbo.[User].id=:id  AND dbo.Role.id IS NOT NULL      ");
        Query query=entityManager.createNativeQuery(sql.toString(),Role.class);
        query.setParameter("id",id);


        roles= query.getResultList();

        return roles;
    }

    @Override
    public boolean deleteUserRole(RequestUserRole delete) {
        StringBuilder sql = new StringBuilder();
        sql.append("  DELETE FROM dbo.UserRole " +
                "        WHERE UserId=:uId AND RoleId=:rId  ");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("uId",delete.getUserId());
        query.setParameter("rId",delete.getRoleId());
        query.executeUpdate();
        int result=0;
        result= query.executeUpdate();

        return result >0;
    }

    @Override
    public boolean saveUserRole(RequestUserRole insert) {
        StringBuilder sql = new StringBuilder();
        sql.append("  INSERT dbo.UserRole " +
                "        ( UserId, RoleId )  " +
                " VALUES  ( :uId, " +
                "          :rId   " +
                "          )  ");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("uId",insert.getUserId());
        query.setParameter("rId",insert.getRoleId());
        int result=0;
        result= query.executeUpdate();

        return result >0;
    }
}

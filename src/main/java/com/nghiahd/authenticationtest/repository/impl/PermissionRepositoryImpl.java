package com.nghiahd.authenticationtest.repository.impl;

import com.nghiahd.authenticationtest.repository.DTO.PermissionDetailDTO;
import com.nghiahd.authenticationtest.repository.DTO.RequestPermissionRole;
import com.nghiahd.authenticationtest.repository.DTO.RolePermissionDTO;
import com.nghiahd.authenticationtest.repository.DTO.UserPermissionDTO;
import com.nghiahd.authenticationtest.repository.PermissionRepository;
import com.nghiahd.authenticationtest.repository.PermissionRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

public class PermissionRepositoryImpl implements PermissionRepositoryCustom {
    @Autowired
    //@PersistenceContext(unitName = "entityManagerFactory")
    private EntityManager entityManager;

    @Override
    public List<UserPermissionDTO> getUserPermissionDTO() {
        StringBuilder sql= new StringBuilder();
        List<UserPermissionDTO> userPermissionDTOS=new ArrayList<>();
        sql.append("    SELECT DISTINCT pd.Code, u.UserName,r.RoleName,pd.Name " +
                "   FROM dbo.[User] u LEFT JOIN dbo.UserRole ur ON ur.UserId = u.id " +
                "   LEFT JOIN dbo.Role r ON r.id = ur.RoleId    " +
                "   LEFT JOIN dbo.PermissionDetailRole pdr ON pdr.RoleId = r.id " +
                "   LEFT JOIN dbo.PermissionDetail pd ON pd.id = pdr.PermissionDetailId " +
                "   ORDER BY r.RoleName ");
        Query query=entityManager.createNativeQuery(sql.toString(),"UserPermissionDTO");

        userPermissionDTOS=query.getResultList();

        return userPermissionDTOS;
    }

    @Override
    public Page<UserPermissionDTO> getUserPermissionDTOPage() {
        Sort sort= Sort.by(Sort.Direction.ASC,"code");
        PageRequest pageRequest=PageRequest.of(1,3,sort);
        //Pageable pageable=
        long total=6;
        StringBuilder sql= new StringBuilder();
        List<UserPermissionDTO> userPermissionDTOS=new ArrayList<>();
        sql.append("    SELECT DISTINCT pd.Code as code, u.UserName as userName,r.RoleName roleName,pd.Name as name " +
                "   FROM dbo.[User] u LEFT JOIN dbo.UserRole ur ON ur.UserId = u.id " +
                "   LEFT JOIN dbo.Role r ON r.id = ur.RoleId    " +
                "   LEFT JOIN dbo.PermissionDetailRole pdr ON pdr.RoleId = r.id " +
                "   LEFT JOIN dbo.PermissionDetail pd ON pd.id = pdr.PermissionDetailId " +
                "  ");
        Query query=entityManager.createNativeQuery(sql.toString(),"UserPermissionDTO");

        query.setFirstResult((int)pageRequest.getOffset());
        query.setMaxResults(pageRequest.getPageSize());
        userPermissionDTOS=query.getResultList();

        if(userPermissionDTOS.size()==0){
            return new PageImpl<>(new ArrayList<>());
        }

        return new PageImpl<>(userPermissionDTOS,pageRequest,total);


        //return null;
    }

    @Override
    public List<RolePermissionDTO> getPermissionDetailByRoleId( int id) {
        StringBuilder sql= new StringBuilder();
        List<RolePermissionDTO> rolePermissionDTOS=new ArrayList<>();
        sql.append("  SELECT r.id id, " +
                " r.RoleName roleName, " +
                " p.id permissionId, " +
                " p.Name permissionName, " +
                " p.Code permissionCode, " +
                " pd.id permissionDetailId, " +
                " pd.Code permissionDetailCode, " +
                " pd.Name permissionDetailName     " +
                " FROM dbo.Role r LEFT JOIN dbo.PermissionDetailRole pdr ON pdr.RoleId = r.id " +
                " LEFT JOIN dbo.PermissionDetail pd ON pd.id = pdr.PermissionDetailId " +
                " LEFT JOIN dbo.Permission p ON p.id=pd.PermissionId " +
                "WHERE pdr.RoleId=:id  ");
        Query query=entityManager.createNativeQuery(sql.toString(),"RolePermissionDTO");
        query.setParameter("id",id);
        rolePermissionDTOS=query.getResultList();

        return rolePermissionDTOS;
    }

    @Override
    public List<PermissionDetailDTO> getAllPermissionDetail() {
        StringBuilder sql = new StringBuilder();
        List<PermissionDetailDTO> permissionDetailDTOS = new ArrayList<>();
        sql.append(" SELECT p.id permissionId, " +
                "                 p.Name permissionName, " +
                "                 p.Code permissionCode, " +
                "                 pd.id permissionDetailId, " +
                "                pd.Code permissionDetailCode, " +
                "                 pd.Name permissionDetailName    " +
                " FROM dbo.PermissionDetail pd LEFT JOIN dbo.Permission p ON p.id = pd.PermissionId ");
        Query query = entityManager.createNativeQuery(sql.toString(), "PermissionDetailDTO");

        permissionDetailDTOS = query.getResultList();

        return permissionDetailDTOS;
    }

    @Override
    public boolean deletePermissionDetailRole(RequestPermissionRole delete) {
        StringBuilder sql = new StringBuilder();
        sql.append("  DELETE FROM dbo.PermissionDetailRole " +
                "        WHERE PermissionDetailId=:pdId AND RoleId=:rId  ");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("pdId",delete.permissionDetaiId);
        query.setParameter("rId",delete.roleId);
        query.executeUpdate();
        int result=0;
        result= query.executeUpdate();

        return result >0;


    }

    @Override
    public boolean savePermissionDetailRole(RequestPermissionRole insert) {
        StringBuilder sql = new StringBuilder();
        sql.append("  INSERT INTO dbo.PermissionDetailRole " +
                "        ( PermissionDetailId, RoleId )  " +
                " VALUES  ( :pdId, " +
                "          :rId   " +
                "          )  ");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("pdId",insert.permissionDetaiId);
        query.setParameter("rId",insert.roleId);
        int result=0;
         result= query.executeUpdate();

        return result >0;

    }

    @Override
    public List<Integer> getAllPermissionDetailCodeByUser(int id) {
        StringBuilder sql = new StringBuilder();
        List<Integer> code = new ArrayList<>();
        sql.append("       SELECT DISTINCT pd.Code  " +
                "   FROM dbo.[User] LEFT JOIN dbo.UserRole ON UserRole.UserId = [User].id   " +
                "   LEFT JOIN dbo.Role ON Role.id = UserRole.RoleId " +
                "   LEFT JOIN  dbo.PermissionDetailRole pdr ON pdr.RoleId = dbo.Role.id     " +
                "   LEFT JOIN dbo.PermissionDetail pd ON pd.id = pdr.PermissionDetailId     " +
                "   WHERE dbo.[User].id=:id      ");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("id",id);

        code = query.getResultList();

        return code;
    }
}

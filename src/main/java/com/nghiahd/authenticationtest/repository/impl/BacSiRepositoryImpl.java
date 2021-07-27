package com.nghiahd.authenticationtest.repository.impl;

import com.google.common.base.Strings;
import com.nghiahd.authenticationtest.common.Common;
import com.nghiahd.authenticationtest.domain.BieuHien;
import com.nghiahd.authenticationtest.repository.BacSiRepositoryCustom;
import com.nghiahd.authenticationtest.repository.DTO.BacSiDTO;
import com.nghiahd.authenticationtest.repository.DTO.ResultChuanDoan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BacSiRepositoryImpl implements BacSiRepositoryCustom {
    @Autowired
    EntityManager entityManager;

    @Override
    public Page<BacSiDTO> getPage(Pageable pageable, String search) {
        StringBuilder sql= new StringBuilder();
        Map<String,Object> param=new HashMap<>();
        sql.append("    from dbo.BacSi     ");

        if(!Strings.isNullOrEmpty(search)){
            sql.append( " WHERE HoTen LIKE :search OR ChucVu LIKE :search  OR HocVi LIKE :search  ");
            param.put("search","%"+search+"%");
        }
        Number total=0;

        String select = " SELECT id as id ,MaBS as MaBS,HoTen as HoTen,HocVi as HocVi" +
                " ,ChucVu as ChucVu,DonViCongTac as DonViCongTac,KhoaId as KhoaId," +
                " Anh as Anh,GioiThieu  as GioiThieu ";


        Query queryCount=entityManager.createNativeQuery("select count(1) " + sql.toString());
        Common.setParams(queryCount,param);

        total=(Number)queryCount.getSingleResult();

        if(total.intValue()>0){
            Query query=entityManager.createNativeQuery(select + sql.toString(),"BacSiDTO");
            Common.setParamsWithPageable(query,param,pageable,total);

            return new PageImpl<>(query.getResultList(),pageable,total.longValue());
        }


        return new PageImpl<>(new ArrayList<>());
    }

    @Override
    public Page<BieuHien> getPageBieuHien(Pageable pageable, String search) {
        StringBuilder sql= new StringBuilder();
        Map<String,Object> param=new HashMap<>();
        sql.append("    from dbo.BieuHien     ");

        if(!Strings.isNullOrEmpty(search)){
            sql.append( " WHERE MaBieuHien LIKE  :search OR MoTa LIKE  :search   ");
            param.put("search","%"+search+"%");
        }
        Number total=0;

        String select = " SELECT id AS id, RTRIM(MaBieuHien) maBieuHien, MoTa mota ";


        Query queryCount=entityManager.createNativeQuery("select count(1) " + sql.toString());
        Common.setParams(queryCount,param);

        total=(Number)queryCount.getSingleResult();

        if(total.intValue()>0){
            Query query=entityManager.createNativeQuery(select + sql.toString(),BieuHien.class);
            Common.setParamsWithPageable(query,param,pageable,total);

            return new PageImpl<>(query.getResultList(),pageable,total.longValue());
        }


        return new PageImpl<>(new ArrayList<>());
    }


    @Override
    public List<ResultChuanDoan> getChuanDoan(StringBuilder idToString) {
        Query query=entityManager.createNativeQuery(" EXEC chuanDoanBenh @listBieuHien=:idString ","ResultChuanDoan");
        Map<String,Object> param=new HashMap<>();
        param.put("idString",idToString.toString());
        Common.setParams(query,param);
        return query.getResultList();
    }
}

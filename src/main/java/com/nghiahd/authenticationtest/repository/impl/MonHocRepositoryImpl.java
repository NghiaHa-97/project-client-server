package com.nghiahd.authenticationtest.repository.impl;

import com.google.common.base.Strings;
import com.nghiahd.authenticationtest.common.Common;
import com.nghiahd.authenticationtest.domain.MonHoc;
import com.nghiahd.authenticationtest.repository.MonHocRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MonHocRepositoryImpl implements MonHocRepositoryCustom {
    @Autowired
    EntityManager entityManager;

    @Override
    public Page<MonHoc> getPageMonHoc(Pageable pageable, String search) {
        StringBuilder sql= new StringBuilder();
        Map<String,Object> param=new HashMap<>();
        sql.append(" FROM dbo.MonHoc mh");

        if(!Strings.isNullOrEmpty(search)){
            search=search.trim();
            sql.append( " WHERE mh.MaMonHoc LIKE :search OR mh.TenMonHoc LIKE :search ");
            param.put("search","%"+search+"%");
        }
        Number total=0;
        String select="    SELECT mh.id,mh.MaMonHoc,mh.TenMonHoc,mh.SoTinChi,mh.SoTietGiangDay   " ;

        Query queryCount=entityManager.createNativeQuery("select count(1) " + sql.toString());
        Common.setParams(queryCount,param);

        total=(Number)queryCount.getSingleResult();

        if(total.intValue()>0){
            Query query=entityManager.createNativeQuery(select + sql.toString(),MonHoc.class);
            Common.setParamsWithPageable(query,param,pageable,total);

            return new PageImpl<>(query.getResultList(),pageable,total.longValue());
        }


        return new PageImpl<>(new ArrayList<>());
    }
}

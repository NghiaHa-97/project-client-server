package com.nghiahd.authenticationtest.repository.impl;

import com.google.common.base.Strings;
import com.nghiahd.authenticationtest.common.Common;
import com.nghiahd.authenticationtest.domain.BieuHien;
import com.nghiahd.authenticationtest.repository.BacSiRepositoryCustom;
import com.nghiahd.authenticationtest.repository.DTO.BacSiDTO;
import com.nghiahd.authenticationtest.repository.DTO.ResultChuanDoan;
//import org.hibernate.jpa.HibernateQuery;
//import org.hibernate.query.NativeQuery;
//
//import org.hibernate.query.criteria.internal.compile.CriteriaQueryTypeQueryAdapter;
//import org.hibernate.query.internal.AbstractProducedQuery;
//import org.hibernate.query.internal.CollectionFilterImpl;
//import org.hibernate.transform.AliasToEntityMapResultTransformer;
//import org.hibernate.transform.AliasToBeanConstructorResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import javax.persistence.*;

import java.util.*;


public class BacSiRepositoryImpl implements BacSiRepositoryCustom {
    @Autowired
    EntityManager entityManager;

    @Override
    public Page<BacSiDTO> getPage(Pageable pageable, String search) {
        StringBuilder sql= new StringBuilder();
        Map<String,Object> param=new HashMap<>();
        sql.append("    from BacSi as bs   ");

        if(!Strings.isNullOrEmpty(search)){
            sql.append( " WHERE bs.hoTen LIKE :search OR bs.chucVu LIKE :search  OR bs.hocVi LIKE :search  ");
            param.put("search","%"+search+"%");
        }
        Number total=0;

        String select = " SELECT bs.id as id ," +
                "bs.maBS as mabs," +
                "bs.hoTen as hoten," +
                "bs.hocVi as hocvi," +
                "bs.chucVu as chucvu, " +
                "bs.donViCongTac as donvicongtac," +
                "bs.khoaId as khoaid," +
                "bs.anh as anh," +
                "bs.gioiThieu  as gioithieu ";



        TypedQuery<Tuple> query= entityManager.createQuery(select + sql.toString() , Tuple.class);

        Common.setParams(query,param);

        List<Tuple> tuples = query.getResultList();




        /*

        Query query=entityManager.createNativeQuery(select + sql.toString());

        Common.setParams(query,param);

//        List result = query.getResultList();
        if(query.unwrap(org.hibernate.query.Query.class) instanceof org.hibernate.query.Query){
            System.out.println("LAAAAAAAA");
        }

        org.hibernate.query.Query q= query.unwrap(org.hibernate.query.Query.class).setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE);

        if(q instanceof CriteriaQueryTypeQueryAdapter){
            System.out.println(1);
        }

        if(q instanceof CollectionFilterImpl){
            System.out.println(2);

        }

        if(q instanceof AbstractProducedQuery){
            System.out.println(3);

        }

//        List<Map<String,Object>> res = query.getResultList();
        List<Map<String,Object>> res = q.list();



         */










//        if(total.intValue()>0){
//            Query query=entityManager.createNativeQuery(select + sql.toString(),"BacSiDTO");
//            Sort sort=pageable.getSort();
//            Iterator<Sort.Order> sortOrder= sort.iterator();
//            while(sortOrder.hasNext()){
//                Sort.Order item= sortOrder.next();
//                System.out.println(item.getProperty() + "----" + item.getDirection());
//            }
//
//
//            Common.setParamsWithPageable(query,param,pageable,total);
//
//            return new PageImpl<>(query.getResultList(),pageable,total.longValue());
//        }





//        Query queryCount=entityManager.createNativeQuery("select count(1) " + sql.toString());
//        Common.setParams(queryCount,param);
//
//        total=(Number)queryCount.getSingleResult();
//
//        if(total.intValue()>0){
//            Query query=entityManager.createNativeQuery(select + sql.toString(),"BacSiDTO");
//            Sort sort=pageable.getSort();
//            Iterator<Sort.Order> sortOrder= sort.iterator();
//            while(sortOrder.hasNext()){
//                Sort.Order item= sortOrder.next();
//                System.out.println(item.getProperty() + "----" + item.getDirection());
//            }
//
//
//            Common.setParamsWithPageable(query,param,pageable,total);
//
//            return new PageImpl<>(query.getResultList(),pageable,total.longValue());
//        }


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
//        Query query=entityManager.createNativeQuery(" EXEC chuanDoanBenh @listBieuHien=:idString ","ResultChuanDoan");
//        TypedQuery<Tuple> query=entityManager.createQuery(" EXEC chuanDoanBenh @listBieuHien=:idString ", Tuple.class);
        StoredProcedureQuery query=entityManager.createStoredProcedureQuery(" chuanDoanBenh ");
        query.registerStoredProcedureParameter("listBieuHien",String.class, ParameterMode.IN);

        query.setParameter("listBieuHien",idToString.toString());
//        Map<String,Object> param=new HashMap<>();
//        param.put("listBieuHien",idToString.toString());
//        Common.setParams(query,param);
        boolean i = query.execute();
        List tuples= query.getResultList();

        return null;
    }
}

package com.nghiahd.authenticationtest.repository.impl;

import com.google.common.base.Strings;
import com.nghiahd.authenticationtest.common.Common;
import com.nghiahd.authenticationtest.repository.DTO.SanPhamDTO;
import com.nghiahd.authenticationtest.repository.SanPhamRepositoryCustom;
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

public class SanPhamRepositoryImpl implements SanPhamRepositoryCustom {

    @Autowired
    EntityManager entityManager;

    @Override
    public Page<SanPhamDTO> getPageSanPham(Pageable pageable, String search) {
        StringBuilder sql= new StringBuilder();
        Map<String,Object> param=new HashMap<>();
        sql.append(" FROM dbo.SanPham sp LEFT JOIN dbo.TheLoai tl ON tl.id = sp.TheLoaiID " +
                " LEFT JOIN dbo.NSX nsx ON nsx.id = sp.NSXID " +
                " LEFT JOIN dbo.[User] u ON u.id = sp.userid    ");

        if(!Strings.isNullOrEmpty(search)){
            sql.append( " WHERE sp.TenSanPham LIKE :search  " +
                    " OR CAST(sp.Gia AS NVARCHAR(20)) LIKE :search  " +
                    " OR nsx.TenNSX LIKE :search  " +
                    " OR tl.Ten LIKE :search " +
                    " OR u.UserName LIKE :search ");
            param.put("search","%"+search+"%");
        }
        Number total=0;
        String select="    SELECT sp.id idsp," +
                "  sp.userid iduser," +
                "  u.UserName username," +
                "  sp.TenSanPham tensanpham," +
                "  sp.Gia gia," +
                "  sp.SoLuong soluong," +
                "  sp.AnhDaiDien anh," +
                "  sp.Ngay ngaysx," +
                "  sp.MoTa mota," +
                "  nsx.TenNSX tennsx," +
                "  tl.Ten tenloai    " ;

        Query queryCount=entityManager.createNativeQuery("select count(1) " + sql.toString());
        Common.setParams(queryCount,param);

        total=(Number)queryCount.getSingleResult();

        if(total.intValue()>0){
            Query query=entityManager.createNativeQuery(select + sql.toString(),"SanPhamDTO");
            Common.setParamsWithPageable(query,param,pageable,total);

            return new PageImpl<>(query.getResultList(),pageable,total.longValue());
        }


        return new PageImpl<>(new ArrayList<>());
    }

    @Override
    public List<SanPhamDTO> getListSanPhamByListId(List<Integer> ids) {
        StringBuilder sql= new StringBuilder();
        Map<String,Object> param=new HashMap<>();
        sql.append(" FROM dbo.SanPham sp LEFT JOIN dbo.TheLoai tl ON tl.id = sp.TheLoaiID " +
                " LEFT JOIN dbo.NSX nsx ON nsx.id = sp.NSXID " +
                " LEFT JOIN dbo.[User] u ON u.id = sp.userid   " +
                " Where  sp.id in ");
        sql.append(" ( ");
        for (int i=0;i<ids.size();i++) {
            sql.append(ids.get(i));

            if(i!=ids.size()-1)
                sql.append(",");
        }
        sql.append(" ) ");

        String select="    SELECT sp.id idsp," +
                "  sp.userid iduser," +
                "  u.UserName username," +
                "  sp.TenSanPham tensanpham," +
                "  sp.Gia gia," +
                "  sp.SoLuong soluong," +
                "  sp.AnhDaiDien anh," +
                "  sp.Ngay ngaysx," +
                "  sp.MoTa mota," +
                "  nsx.TenNSX tennsx," +
                "  tl.Ten tenloai    " ;


        Query query=entityManager.createNativeQuery(select + sql.toString(),"SanPhamDTO");
        return query.getResultList();

    }
}

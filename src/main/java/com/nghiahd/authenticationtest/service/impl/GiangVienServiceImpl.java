package com.nghiahd.authenticationtest.service.impl;

import com.google.common.base.Strings;
import com.nghiahd.authenticationtest.common.Common;
import com.nghiahd.authenticationtest.domain.GiangVien;
import com.nghiahd.authenticationtest.repository.DTO.GiangVienDTO;
import com.nghiahd.authenticationtest.repository.GiangVienRepository;
import com.nghiahd.authenticationtest.service.GiangVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.*;

@Service
@Transactional
public class GiangVienServiceImpl implements GiangVienService {
	@Autowired
	GiangVienRepository giangVienRepository;
	@Autowired
    EntityManager entityManager;

//	@Override
//	public List<GiangVien> getAllGiangVien() {
//		return giangVienRepository.findAll();
//	}

	@Override
	public List<GiangVien> getGiangVienByMaNV(String maNV) {
		return giangVienRepository.findByMaGV(maNV);
	}

	@Override
	public List<GiangVien> getGiangVienByHoTenOrMaGV(String keyword) {
		return giangVienRepository.findByHoTenOrMaGV(keyword);
	}

	@Override
	public GiangVien saveGiangVien(GiangVien giangvien) {
		return giangVienRepository.save(giangvien);
	}

	@Override
	public Optional<GiangVien> getGiangVientById(Integer id) {
		return giangVienRepository.findById(id);
	}

	@Override
	public void deleteGiangVien(Integer id) {
		 giangVienRepository.deleteById(id);
	}

	@Override
	public Page<GiangVienDTO> getAllGiangVien(Pageable pageable, String maGV_hoTen) {
		StringBuilder sql= new StringBuilder();
        Map<String,Object> param=new HashMap<>();
        sql.append(" from dbo.GiangVien g    ");

        if(!Strings.isNullOrEmpty(maGV_hoTen)){
            sql.append( " WHERE g.hoTen LIKE :search OR g.maGV LIKE :search ");
            param.put("search","%"+maGV_hoTen+"%");
        }
        Number total=0;
//        String select="    SELECT a.id userId,      " +
//                        "a.UserName userName,      " +
//                        "(CASE  " +
//                        " WHEN (EXISTS  (SELECT r.id " +
//                        " FROM  dbo.UserRole r " +
//                        " WHERE r.RoleId=2 AND r.UserId=a.id)) THEN 1 " +
//                        "  ELSE 0 " +
//                        "END) AS admin,      " +
//                        "b.id userDetailId,      " +
//                        "b.HoTen hoTen,      " +
//                        "b.GioiTinh gioiTinh,      " +
//                        "b.NgaySinh ngaySinh,b.DiaChi diaChi,b.TaiKhoan taiKhoan,b.SDT sdt,b.Email email     " ;
        String select = "SELECT g.id id, g.maGV maGV, g.hoTen hoTen, g.gioiTinh gioiTinh, g.email email, g.ngaySinh ngaySinh,	"+
        				"g.noiSinh noiSinh, g.danToc danToc, g.hocVi hocVi, g.chucVu chucVu, g.dienThoai dienThoai ";
        

        Query queryCount=entityManager.createNativeQuery("select count(1) " + sql.toString());
        Common.setParams(queryCount,param);

        total=(Number)queryCount.getSingleResult();

        if(total.intValue()>0){
            Query query=entityManager.createNativeQuery(select + sql.toString(),"GiangVienDTO");
            Common.setParamsWithPageable(query,param,pageable,total);
            //System.out.println(query.getResultList());

            return new PageImpl<>(query.getResultList(),pageable,total.longValue());
        }


        return new PageImpl<>(new ArrayList<>());

	}

}

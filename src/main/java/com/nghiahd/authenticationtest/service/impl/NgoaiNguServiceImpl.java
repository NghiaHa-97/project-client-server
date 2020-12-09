package com.nghiahd.authenticationtest.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nghiahd.authenticationtest.domain.NgoaiNgu;
import com.nghiahd.authenticationtest.domain.QuaTrinhNgoaiNgu;
import com.nghiahd.authenticationtest.repository.NgoaiNguRepository;
import com.nghiahd.authenticationtest.repository.QuaTrinhNgoaiNguRepository;
import com.nghiahd.authenticationtest.service.NgoaiNguService;

@Service
public class NgoaiNguServiceImpl implements NgoaiNguService {

	@Autowired
	NgoaiNguRepository ngoaiNguRepository;
	@Autowired
	QuaTrinhNgoaiNguRepository quaTrinhNgoaiNguRepository; 

	@Override
	public List<NgoaiNgu> getAll() {
		return ngoaiNguRepository.findAll();
	}

	@Override
	public List<QuaTrinhNgoaiNgu> getQTNNByGiangVienId(Integer giangVienId) {
		// TODO Auto-generated method stub
		return quaTrinhNgoaiNguRepository.findByGiangVienId(giangVienId);
	}

	@Override
	public QuaTrinhNgoaiNgu getQTNN_NearestDayByGiangVienId(Integer giangvienId) {
		// TODO Auto-generated method stub
		return quaTrinhNgoaiNguRepository.getQTNN_NearestDayByGiangVienId(giangvienId);
	}

	@Override
	public QuaTrinhNgoaiNgu saveQTNgoaiNgu(QuaTrinhNgoaiNgu qtnn) {
		// TODO Auto-generated method stub
		return quaTrinhNgoaiNguRepository.save(qtnn);
	}
	
}

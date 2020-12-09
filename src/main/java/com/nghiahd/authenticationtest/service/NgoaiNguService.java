package com.nghiahd.authenticationtest.service;

import java.util.List;

import com.nghiahd.authenticationtest.domain.NgoaiNgu;
import com.nghiahd.authenticationtest.domain.QuaTrinhNgoaiNgu;

public interface NgoaiNguService {

	List<NgoaiNgu> getAll();
	List<QuaTrinhNgoaiNgu> getQTNNByGiangVienId(Integer id);
	QuaTrinhNgoaiNgu getQTNN_NearestDayByGiangVienId(Integer giangvienId);
	QuaTrinhNgoaiNgu saveQTNgoaiNgu(QuaTrinhNgoaiNgu qtnn);
}

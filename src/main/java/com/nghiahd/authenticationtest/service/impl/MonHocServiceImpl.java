package com.nghiahd.authenticationtest.service.impl;

import com.nghiahd.authenticationtest.domain.MonHoc;
import com.nghiahd.authenticationtest.repository.MonHocRepository;
import com.nghiahd.authenticationtest.service.MonHocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MonHocServiceImpl implements MonHocService {

    @Autowired
    MonHocRepository monHocRepository;


    @Override
    public Page<MonHoc> getPageMonHoc(Pageable pageable, String search) {
        return monHocRepository.getPageMonHoc(pageable,search);
    }

    @Override
    public void delete(Integer id) {
        monHocRepository.deleteById(id);
    }

    @Override
    public void save(MonHoc monhoc) {
        monHocRepository.save(monhoc);
    }

    @Override
    public MonHoc getById(Integer id) {
        return monHocRepository.findById(id).get();
    }
}

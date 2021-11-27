package com.nghiahd.authenticationtest.service.impl;

import com.nghiahd.authenticationtest.domain.BacSi;
import com.nghiahd.authenticationtest.domain.BieuHien;
import com.nghiahd.authenticationtest.repository.BacSiRepository;
import com.nghiahd.authenticationtest.repository.DTO.BacSiDTO;
import com.nghiahd.authenticationtest.repository.DTO.ResultChuanDoan;
import com.nghiahd.authenticationtest.service.BacSiService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BacSiServiceImpl implements BacSiService {
    private final BacSiRepository bacSiRepository;

    public BacSiServiceImpl( BacSiRepository bacSiRepository) {
        this.bacSiRepository = bacSiRepository;
    }

    @Override
    public List<BacSi> getAllBacSi() {
        return bacSiRepository.getAllBacSi();
    }


    @Override
    public Page<BacSiDTO> getPage(Pageable pageable, String serach) {
        return bacSiRepository.getPage(pageable, serach);
    }

    @Override
    public Page<BieuHien> getPageBieuHien(Pageable pageable, String serach) {
        return bacSiRepository.getPageBieuHien(pageable, serach);
    }

    @Override
    public BacSi findOne(Integer id) {
        return bacSiRepository.findById(id).get();
    }

    @Override
    public BacSi save(BacSi bs) {
        return bacSiRepository.save(bs);
    }

    @Override
    public List<ResultChuanDoan> getChuanDoan(List<Integer> listId) {
        StringBuilder idToString= new StringBuilder();
        for (Integer i: listId){
            idToString.append(i).append(",");
        }
        return bacSiRepository.getChuanDoan(idToString);
    }
}

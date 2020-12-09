package com.nghiahd.authenticationtest.service;

import com.nghiahd.authenticationtest.domain.MonHoc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MonHocService {
    Page<MonHoc> getPageMonHoc(Pageable pageable, String search);

    void delete(Integer id);

    void save(MonHoc monhoc);

    MonHoc getById(Integer id);
}

package com.nghiahd.authenticationtest.repository;

import com.nghiahd.authenticationtest.domain.MonHoc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MonHocRepositoryCustom {
    Page<MonHoc> getPageMonHoc(Pageable pageable, String search);
}

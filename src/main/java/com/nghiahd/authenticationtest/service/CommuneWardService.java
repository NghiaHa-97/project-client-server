package com.nghiahd.authenticationtest.service;

import com.nghiahd.authenticationtest.domain.CommuneWard;

import java.util.List;

public interface CommuneWardService {

    List<CommuneWard> getAllCommuneWard(int districtID);
}

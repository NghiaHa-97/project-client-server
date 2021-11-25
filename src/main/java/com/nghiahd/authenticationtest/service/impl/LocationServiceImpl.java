package com.nghiahd.authenticationtest.service.impl;

import com.nghiahd.authenticationtest.domain.Location;
import com.nghiahd.authenticationtest.repository.DTO.LocationDTO;
import com.nghiahd.authenticationtest.repository.LocationRepository;
import com.nghiahd.authenticationtest.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Column;
import java.math.BigDecimal;

@Service
@Transactional
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;

    public LocationServiceImpl(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    public Location addLocation(Location request) {
        return locationRepository.save(request);
    }

}

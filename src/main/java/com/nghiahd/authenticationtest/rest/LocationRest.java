package com.nghiahd.authenticationtest.rest;

import com.nghiahd.authenticationtest.domain.Location;
import com.nghiahd.authenticationtest.service.LocationService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/location")
public class LocationRest {
    private final LocationService locationService;

    public LocationRest(LocationService locationService) {
        this.locationService = locationService;
    }

    @PostMapping(value = "/add-location")
    public Location addLocation(@RequestBody Location request) {
        return locationService.addLocation(request);
    }

}
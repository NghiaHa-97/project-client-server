import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { HomService } from './hom.service';
import { SanPhamDTO } from '../model/SanPhamDTO.model';
import { ShoppingCart } from '../model/ShoppingCart.model';
import { ToastrService } from 'ngx-toastr';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import 'leaflet';


declare let L: any;
const iconDefault = L.icon({
  iconUrl: './marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  map: any;
  currentCity: string[];

  cities = [
    { value: 'paris-0', viewValue: 'Paris' },
    { value: 'miami-1', viewValue: 'Miami' },
    { value: 'bucharest-2', viewValue: 'Bucharest' },
    { value: 'new-york-3', viewValue: 'New York' },
    { value: 'london-4', viewValue: 'London' },
    { value: 'barcelona-5', viewValue: 'Barcelona' },
    { value: 'moscow-6', viewValue: 'Moscow' }
  ];

  formSearch=this.fb.group({
    search:""
  });
  formUpdate=this.fb.group({

  })


  constructor(private homeService: HomService,
              private toastrService: ToastrService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      this.map = this.initMap(latitude, longitude);
      this.markerMap(latitude, longitude, this.map);
    });
  }


  initMap(latitude: number, longitude: number): any {

    const map = L.map('map').setView([latitude, longitude], 13);

    const wmsLayer = L.tileLayer.wms('http://localhost:8081/geoserver/wms', {
      service: 'WMS',
      version: '1.1.0',
      request: 'GetMap',
      layers: ['osm-vn-1'],
      transparent: true
    });
    map.addLayer(wmsLayer);
    return map;
  }

  markerMap(lat: number, lng: number, map: any) {
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`vĩ độ : ${lat}| kinh độ : ${lng}`)
      .openPopup();
  }

  formSearchSubmit(){

  }

  formUpdateSubmit(){

  }

  ngAfterViewInit() {

  }


}

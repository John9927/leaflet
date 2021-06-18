
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GetIpService } from '../services/get-ip.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public getIpService: GetIpService) { }

  city = [
    {
      id: 0,
      name: "All",
      coordLat: 42.68309728284572,
      coordLon: 13.37005477702912,
      zoom: 5
    },
    {
      id: 1,
      name: "Parma",
      coordLat: 44.80375013284164,
      coordLon: 10.315789541227566,
      zoom: 10
    },
    {
      id: 2,
      name: "Pescara",
      coordLat: 42.45504140150499,
      coordLon: 14.209388716502607,
      zoom: 10
    },
    {
      id: 3,
      name: "Livorno",
      coordLat: 43.54946955368824,
      coordLon: 10.311902132948411,
      zoom: 10
    },
    {
      id: 4,
      name: "Bari",
      coordLat: 41.121053356068565,
      coordLon: 16.867674789892508,
      zoom: 10
    },
    {
      id: 5,
      name: "Guglionesi",
      coordLat: 41.91250221874158,
      coordLon: 14.920696768398148,
      zoom: 25
    },
  ]

  ngOnInit(): void {
    this.getIpService.variable = true;
    this.initializingMap();

    setTimeout(() => {
      this.getIpService.initial();
    }, 10)
  }

  onWrite(value: any) {
    console.log(value);
  }

  onClick(id: number, lat: any, lon: any, zoom: number) {
    this.initializingMap();
    this.getIpService.coordLat = lat;
    this.getIpService.coordLon = lon;
    this.getIpService.zoom = zoom;
    this.getIpService.getCoords();
  }

  initializingMap() {
    if(this.getIpService.map) {
      this.getIpService.map.remove();
    }
  }
}

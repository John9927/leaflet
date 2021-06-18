import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class GetIpService {
  options: any;
  coordLon: any;
  coordLat: any;
  zoom: number;
  variable = false;
  map: any;

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
      zoom: 15
    },
    {
      id: 2,
      name: "Pescara",
      coordLat: 42.45504140150499,
      coordLon: 14.209388716502607,
      zoom: 15
    },
    {
      id: 3,
      name: "Livorno",
      coordLat: 43.54946955368824,
      coordLon: 10.311902132948411,
      zoom: 15
    },
    {
      id: 4,
      name: "Bari",
      coordLat: 41.121053356068565,
      coordLon: 16.867674789892508,
      zoom: 14
    },
    {
      id: 5,
      name: "Guglionesi",
      coordLat: 41.91250221874158,
      coordLon: 14.920696768398148,
      zoom: 25
    },
  ]

  constructor() {
    this.coordLat;
    this.coordLon;
   }

  getCoords() {
    this.variable = true;
    this.map = L.map('map', {
      center: [this.coordLat, this.coordLon],
      zoom: this.zoom
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    L.marker([this.coordLat, this.coordLon], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconRetinaUrl: './../../../assets/download.jfif',
        iconUrl: './../../../assets/download.jfif',
        shadowUrl: './marker-shadow.png',
      })
    }).addTo(this.map);
  }

  initial() {
    this.variable = true;
    this.map = L.map('map', {
      center: [41.914181052830195, 14.916113448805161],
      zoom: 5
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    L.marker([41.914181052830195, 14.916113448805161], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconRetinaUrl: './../../../assets/download.jfif',
        iconUrl: './../../../assets/download.jfif',
        shadowUrl: './marker-shadow.png',
      })
    }
    )
    .addTo(this.map);
  }
}



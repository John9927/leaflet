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

  constructor() {
    this.coordLat = 40;
    this.coordLon = 30;
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


  remove() {
    this.map.remove()
  }
}

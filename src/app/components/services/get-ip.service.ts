import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as L from 'leaflet';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetIpService {
  coordLon: number;
  coordLat: number;
  zoom: number;
  variable: Boolean = false;
  datepicker: Boolean = false;
  map: any;
  listDatepicker: any = [];
  dataStorage;
  idNum: any = 0;
  filiali: any;

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) { }

  getFiliali() {
    this.filiali = this.firestore.collection('filiali').valueChanges();
  }

  getCoords() {
    this.variable = true;
    this.map = L.map('map', {
      center: [this.coordLat, this.coordLon],
      zoom: this.zoom
    });
    L.marker([this.coordLat, this.coordLon]).addTo(this.map).on('click', () => this.onClickMarker());
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

  }

  initial() {
    this.variable = true;
    this.map = L.map('map', {
      center: [41.914181052830195, 14.916113448805161],
      zoom: 5
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    L.marker([41.914181052830195, 14.916113448805161]).addTo(this.map).on('click', () => this.onClickMarker());
  }

  onClickMarker() {
    this.datepicker = !this.datepicker;
  }
}



import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as L from 'leaflet';

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
  $id: any;
  data: any;

  constructor(private firestore: AngularFirestore) { }

  getFiliali() {
    this.filiali = this.firestore.collection('filiali').valueChanges();
  }

  addData(dato: any) {
    this.firestore.collection('data').add(dato);
  }

  getData() {
    this.firestore
      .collection('data')
      .snapshotChanges()
      .subscribe(newspapers => {
        return newspapers.map(newspaper => {
          const $id = newspaper.payload.doc.id;
          this.$id = $id;
          this.data = newspaper.payload.doc.data() as any;
          return { $id, ...this.data };
        });
      });
  }

  deleteDocument(url: string, id: string): Promise<any> {
    return this.getDocumentRef(`${url}${id}`).delete();
  }

  getDocumentRef(path: string): AngularFirestoreDocument {
    return this.firestore.doc(path);
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
  }

  onClickMarker() {
    this.datepicker = true;
  }
}



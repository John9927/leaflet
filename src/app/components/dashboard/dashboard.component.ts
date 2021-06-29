
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { GetIpService } from '../services/get-ip.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(public getIpService: GetIpService, private firestore: AngularFirestore, private router: Router) {}

  events: Date;
  nameCity: string;
  idCity: number;
  name: string;
  result: any;
  boolean = false;
  visibleSalva: Boolean = false;
  movies: any[];
  data: any;

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events = event.value;
    let dataDaFormattare = new Date(event.value);
    let mese: any = dataDaFormattare.getMonth() + 1;
    if(mese < 10 ) {
      mese = '0' + mese;
    }
    this.data = dataDaFormattare.getDate() + '/' + mese + '/' + dataDaFormattare.getFullYear();
  }

  onClickList() {
    this.router.navigateByUrl('list')
  }

  ngOnInit(): void {
    this.getIpService.getFiliali();
    this.getIpService.variable = true;
    var idNum = localStorage.getItem('idNum');
    this.getIpService.idNum = idNum;
    this.initializingMap();
    // this.result = this.filiali.subscribe(res => res.filter(res => res.name));

    setTimeout(() => {
      this.getIpService.initial();
    }, 10);
  }

  onWrite(value: any) {
    if (value.length == 0) {
      console.log(value)
      // this.getIpService.getFiliali();

      this.boolean = false;
    } else {
      console.log(value);
      // this.filiali = this.filiali.subscribe(res => res.filter(res => String(res.name).toLocaleLowerCase().startsWith(value.toLocaleLowerCase())));
      // this.filiali = this.filiali.subscribe(res => console.log(res.name) )
      // this.result = this.filiali.subscribe(res => res.filter(res => {
      //   this.boolean = false;
      //   return String(res.name).toLocaleLowerCase().startsWith(value.toLocaleLowerCase());
      // }))
    }
    //  if (this.result.length == 0) {
    //    this.boolean = true;
    //  }
  }


  onClick(id: number, lat: any, lon: any, zoom: number, name: string) {
    this.initializingMap();
    this.getIpService.coordLat = lat;
    this.getIpService.coordLon = lon;
    this.getIpService.zoom = zoom;
    this.nameCity = name;
    this.idCity = id;
    this.getIpService.getCoords();
  }

  initializingMap() {
    if (this.getIpService.map) {
      this.getIpService.map.remove();
    }
  }

  onClickIcon() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onClickAnnulla() {
    this.getIpService.datepicker = false;
  }

  getName(name) {
    this.name = name;
    if (this.name.length > 0) {
      this.visibleSalva = true;
    } else
      this.visibleSalva = false;
  }

  onClickSalva(datepicker: any) {
    // Se lo storage é vuoto allora non mettere nulla nell'array e fai il push
    if (this.getIpService.dataStorage == null || this.getIpService.dataStorage == "") {
      this.getIpService.addData({ 'data': this.data, 'Citta': this.nameCity, 'Name': this.name });
    } else {
      // Altrimenti prendi il dato che sta nello storage e pusha il nuovo oggetto
      this.getIpService.addData({ 'data': this.data, 'Citta': this.nameCity,  'Name': this.name });
    }
    this.getIpService.datepicker = false;
  }
}

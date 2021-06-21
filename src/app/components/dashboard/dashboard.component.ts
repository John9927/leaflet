
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { GetIpService } from '../services/get-ip.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public getIpService: GetIpService) { }

  events: Date;
  nameCity: string;
  idCity: number;

  @ViewChild('datepickeer') datepickeer: any;
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events = event.value;
  }

  result;
  boolean = false;

  ngOnInit(): void {
    this.getIpService.variable = true;
    this.initializingMap();
    this.result = this.getIpService.city.filter(res => res.name);
    setTimeout(() => {
      this.getIpService.initial();
    }, 10);
  }

  onWrite(value: any) {
    if (value.length == 0) {
      this.result = this.getIpService.city.filter(res => res.name);
      this.boolean = false;
    } else {
      this.result = this.getIpService.city.filter(res => {
        this.boolean = false;
        return String(res.name).toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
      });

      if (this.result.length == 0) {
        this.boolean = true;
      }
    }
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

  onClickSalva(datepicker: any) {
    this.getIpService.listDatepicker.push({ 'data': this.events, 'Citta': this.nameCity, 'Id': this.idCity });
    localStorage.getItem('datepicker');
    localStorage.setItem('datepicker', JSON.stringify(this.getIpService.listDatepicker));
    this.getIpService.datepicker = false;
  }
}

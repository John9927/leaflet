
import { Component, OnInit } from '@angular/core';
import { GetIpService } from '../services/get-ip.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public getIpService: GetIpService) { }

  result;
  boolean = false;

  ngOnInit(): void {
    this.getIpService.variable = true;
    this.initializingMap();
    this.result = this.getIpService.city.filter(res => res.name);
    setTimeout(() => {
      this.getIpService.initial();
    }, 10)
  }

  onWrite(value: any) {
    if (value.length == 0) {
      this.result = this.getIpService.city.filter(res => res.name);
      this.boolean = false;
    } else {
      this.result = this.getIpService.city.filter(res => {
        this.boolean = false;
        return String(res.name).toLocaleLowerCase().startsWith(value)
      });

      if (this.result.length == 0) {
        this.boolean = true;
      }
    }
  }

  onClick(id: number, lat: any, lon: any, zoom: number) {
    this.initializingMap();
    this.getIpService.coordLat = lat;
    this.getIpService.coordLon = lon;
    this.getIpService.zoom = zoom;
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
}

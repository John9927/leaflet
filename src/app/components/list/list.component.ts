import { GetIpService } from './../services/get-ip.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(public getIpService: GetIpService) { }
  datepicker: any = [];

  ngOnInit(): void {
    this.datepicker = localStorage.getItem('datepicker');
    this.datepicker = JSON.parse(this.datepicker);
  }

  onClickDelete(id: number) {
    var lists = this.datepicker.filter(res => {
      return res.Id != id;
    });
    this.datepicker = lists;
  }
}

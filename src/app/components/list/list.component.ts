import { GetIpService } from './../services/get-ip.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(public getIpService: GetIpService, private router: Router, private firestore: AngularFirestore) { }
  datepicker: any = [];
  dataFiltrato: any = [];
  dataPath: "data/";
  url = "data/";
  today: any;


  ngOnInit(): void {
    let dataDaFormattare = new Date();
    let mese: any = dataDaFormattare.getMonth() + 1;
    if (mese < 10) {
      mese = '0' + mese;
    }
    this.today = dataDaFormattare.getDate() + '/' + mese + '/' + dataDaFormattare.getFullYear();
    console.log(this.today)
    this.getDatas();
    this.filterData();
  }

  getDatas() {
    return this.getData().subscribe(data =>
      this.datepicker = data.docs.map(e => {
        return {
          id: e.id,
          ...e.data() as any
        } as any;
      }));
  }

  filterData() {
    return this.filteringData().subscribe(data =>
      this.dataFiltrato = data.docs.map(e => {
        return {
          id: e.id,
          ...e.data() as any
        } as any;
      }));
  }

  onClickDelete(id: string) {
    this.getIpService.deleteDocument(this.url, id);
    setTimeout(() => {
      this.getDatas();
    }, 10)
  }

  onClickArrow() {
    this.router.navigateByUrl('');
  }

  getData() {
    return this.firestore.collection('data').get();
  }

  filteringData() {
    return this.firestore.collection('data', res => res.where('data', '==', this.today)).get();
  }
}

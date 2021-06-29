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
  dataPath: "data/";
  url = "data/";

  ngOnInit(): void {
    this.getDatas();
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
}

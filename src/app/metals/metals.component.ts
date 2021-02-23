import { Component, OnInit } from '@angular/core';
import {MetalsService} from '../services/metals.service';
import {Metals} from '../models/metals.model';
import {FirebaseService} from '../services/firebase.service';
import {FirebaseDBService} from '../services/firebase-db.service';

@Component({
  selector: 'app-metals',
  templateUrl: './metals.component.html',
  styleUrls: ['./metals.component.css']
})
export class MetalsComponent implements OnInit {

  public metalsList: Metals;
  public rates: any[];
  public currencyBase: string;

  constructor(private metals: MetalsService, public firebaseService: FirebaseService, public firebaseDB: FirebaseDBService) { }

  ngOnInit(): void {
    this.getMetals();
  }

  getMetals(): void{
    this.metals.getMetals(this.currencyBase)
      .subscribe(data => {
        this.metalsList = data;
      });
  }
}

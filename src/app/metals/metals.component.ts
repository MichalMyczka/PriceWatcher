import { Component, OnInit } from '@angular/core';
import {MetalsService} from '../services/metals.service';
import {Metals} from '../models/metals.model';
import {FirebaseService} from '../services/firebase.service';
import {FirebaseDBService} from '../services/firebase-db.service';
import {MetalsRates} from '../models/metals-rates.model';

@Component({
  selector: 'app-metals',
  templateUrl: './metals.component.html',
  styleUrls: ['./metals.component.css']
})
export class MetalsComponent implements OnInit {

  public metalsList: Metals;
  public rates: any[];
  public currencyBase = 'USD';
  public metalsSearch: MetalsRates[] = [];
  public show = false;
  public chartData = '';
  public temp = '';

  constructor(private metals: MetalsService, public firebaseService: FirebaseService, public firebaseDB: FirebaseDBService) { }

  ngOnInit(): void {
    this.getMetals();
  }

  getMetals(): void{
    this.metals.getMetals(this.currencyBase)
      .subscribe(data => {
        this.metalsList = data;
        this.metalsSearch = this.metalsList.rates;
      });
  }

  getSearch($event: string) {
    this.metalsSearch = this.metalsList.rates.filter(rate => {
      return rate.symbol.includes( $event.toUpperCase());
    });
  }

  showChart(currency: string, base: string): void {
    this.show = !this.show;
    this.temp = 'FX_IDC:' + currency + base;
    if (this.show && currency === currency){
      document.getElementById(currency).style.animation = 'rotating 2s forwards';
    }
    else if (!this.show && currency === currency){
      document.getElementById(currency).style.animation = 'rotatingBack 2s forwards';
    }
    if (currency === 'PL'){
      currency = 'XPT';
    }
    if (currency === 'PA'){
      currency = 'XPD';
    }
    this.chartData = 'FX_IDC:' + currency + base;
  }
}

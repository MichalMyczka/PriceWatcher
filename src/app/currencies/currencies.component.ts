import { Component, OnInit } from '@angular/core';
import {CurrencyService} from '../services/currency.service';
import {Currency} from '../models/currency.model';
import {FormControl} from '@angular/forms';
import {CurrencyRate} from '../models/currency-rates.model';
import {FirebaseService} from '../services/firebase.service';
import {FirebaseDBService} from '../services/firebase-db.service';
import {element} from 'protractor';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  public currencyList: Currency;
  public rates: any[];
  public currencyBase = 'USD';
  public searchRates: CurrencyRate[] = [];
  public show = false;
  public chartData = '';

  constructor(private currency: CurrencyService,
              public firebaseService: FirebaseService,
              public firebaseDB: FirebaseDBService) { }

  ngOnInit(): void {
    this.getCurrencies(this.currencyBase);
  }

  getCurrencies(currency: string): void{
    this.currency.getCurrencies(currency)
      .subscribe(data => {
        this.currencyList = data;
        this.searchRates = this.currencyList.rates;
      });
    }

  getSearch($event: string): void {
    this.searchRates = this.currencyList.rates.filter(rate => {
      return rate.base.includes( $event.toUpperCase()) || rate.name.toUpperCase().includes($event.toUpperCase());
    });
  }

  showChart(currency: string, base: string): void {
    this.show = !this.show;
    this.chartData = 'FX_IDC:' + base + currency ;
    if (this.show && currency === currency){
      document.getElementById(currency).style.animation = 'rotating 2s forwards';
    }
    else if (!this.show && currency === currency){
      document.getElementById(currency).style.animation = 'rotatingBack 2s forwards';
    }
  }
}

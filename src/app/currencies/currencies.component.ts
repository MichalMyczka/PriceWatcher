import { Component, OnInit } from '@angular/core';
import {CurrencyService} from '../services/currency.service';
import {Currency} from '../models/currency.model';
import {FormControl} from '@angular/forms';
import {CurrencyRate} from '../models/currency-rates.model';
import firebase from 'firebase';
import {FirebaseService} from '../services/firebase.service';
import {FirebaseDBService} from '../services/firebase-db.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  public currencyList: Currency;
  public rates: any[];
  public currencyBase: string;
  public currencyInput = new FormControl('');
  public searchRates: CurrencyRate[] = [];

  constructor(private currency: CurrencyService, public firebaseService: FirebaseService, public firebaseDB: FirebaseDBService) { }

  ngOnInit(): void {
    this.getCurrencies(this.currencyBase);
    this.currencyInput.valueChanges.subscribe(
      value => {
        this.searchRates = this.currencyList.rates.filter(rate => {
          return rate.base.includes(value.toUpperCase()) || rate.name.toUpperCase().includes(value.toUpperCase());
          }
        );
      }
    );
  }

  getCurrencies(currency: string): void{
    this.currency.getCurrencies(currency)
      .subscribe(data => {
        this.currencyList = data;
        if (this.currencyInput.value !== ''){
          this.searchRates = this.currencyList.rates.filter(rate => {
            console.log(rate.base, this.currencyInput.value);
            return rate.base.includes(this.currencyInput.value.toUpperCase() || rate.name.toUpperCase().includes(this.currencyInput.value.toUpperCase()));
          });
        }
        else{
          this.searchRates = this.currencyList.rates;
        }

      });
    }
  }

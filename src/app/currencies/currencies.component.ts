import { Component, OnInit } from '@angular/core';
import {CurrencyService} from '../services/currency.service';
import {Currency} from '../models/currency.model';
import {FormControl} from '@angular/forms';
import {CurrencyRate} from '../models/currency-rates.model';
import {FirebaseService} from '../services/firebase.service';
import {FirebaseDBService} from '../services/firebase-db.service';
import {element} from 'protractor';
import firebase from 'firebase';
import {Router} from '@angular/router';

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
  public userFav: any[];

  constructor(private currency: CurrencyService,
              public firebaseService: FirebaseService,
              public firebaseDB: FirebaseDBService,
              public router: Router) { }

  ngOnInit(): void {
    this.getUserFav();
    this.getCurrencies(this.currencyBase);
  }

  async getUserFav(): Promise<any>{
    const currUID = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + currUID + '/favourites/').once('value').then(
      (snapshot) => {
        this.userFav = snapshot.val();
      })
      .catch((error) => {
        console.log('Fetching Error', error);
      });
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

  isFavourite(base, currency): boolean{
    const favourites = Object.keys(this.userFav);
    for (const fav of favourites){
      if (this.userFav[fav].api === 'currencies'){
        if (this.userFav[fav].base.toUpperCase() === base.toUpperCase()
          && this.userFav[fav].currency.toUpperCase() === currency.toUpperCase()){
          return true;
        }
      }
    }
    return false;
  }

  removeFromFav(base, rateSymbol): void{
    const currUID = firebase.auth().currentUser.uid;
    const favourites = Object.keys(this.userFav);
    for (const fav of favourites) {
      if (this.userFav[fav].base === base && this.userFav[fav].currency === rateSymbol){
        firebase.database().ref('/users/' + currUID + '/favourites/' + fav).remove();
      }
    }
    this.reloadComponent();
  }

  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}

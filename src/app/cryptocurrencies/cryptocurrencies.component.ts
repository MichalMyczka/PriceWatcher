import { Component, OnInit } from '@angular/core';
import {CryptocurrenciesService} from '../services/cryptocurrencies.service';
import {Cryptocurrency} from '../models/cryptocurrency.model';
import {FirebaseService} from '../services/firebase.service';
import {FirebaseDBService} from '../services/firebase-db.service';
import {CryptocurrencyRates} from '../models/cryptocurrency-rates.model';
import {CryptocurrencyBase} from '../models/cryptocurrencybase.model';
import firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cryptocurrencies',
  templateUrl: './cryptocurrencies.component.html',
  styleUrls: ['./cryptocurrencies.component.css']
})
export class CryptocurrenciesComponent implements OnInit {

  public cryptoCurrencyList: Cryptocurrency;
  public cryptoCurrencyBase = 'USD';
  public cryptoList: CryptocurrencyBase[] = [];
  public show = false;
  public chartData = '';
  public temp = '';
  public favourites = JSON.parse(localStorage.getItem('favList'));
  public showOrNot = true;

  constructor(private cryptocurrency: CryptocurrenciesService,
              public firebaseService: FirebaseService,
              public firebaseDB: FirebaseDBService,
              public router: Router) { }

  ngOnInit(): void {
    this.getCryptoCurrencies();
    console.log(this.favourites);
  }

  getCryptoCurrencies(): void{
    this.cryptocurrency.getCrypto(this.cryptoCurrencyBase)
      .subscribe(data => {
        this.cryptoCurrencyList = data;
        this.cryptoList = this.cryptoCurrencyList.rates;
      });
  }

  getSearch($event: string): void {
    this.cryptoList = this.cryptoCurrencyList.rates.filter(rate => {
      return rate.symbol.toUpperCase().includes($event.toUpperCase());
    });
  }

  favOrRemove(base, currency){
    const favourites = Object.keys(this.favourites);
    console.log(Object.keys(this.favourites));
    for (let fav of favourites){
      if (this.favourites[fav].api === 'cryptocurrencies'){
        if (this.favourites[fav].base === base && this.favourites[fav].currency === currency){
          console.log(this.favourites[fav].base);
          console.log(this.favourites[fav].currency);
          this.showOrNot = true;
        }
        else{
          this.showOrNot = false;
        }
      }
    }
  }

  removeFromFav(base, rateSymbol): void{
    const currUID = firebase.auth().currentUser.uid;
    const favourites = Object.keys(this.favourites);
    for (const fav of favourites) {
      if (this.favourites[fav].base === base && this.favourites[fav].currency === rateSymbol){
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

  showChart(currency: string, base: string): void {
    this.show = !this.show;
    this.temp = 'COINBASE:' + currency + base;
    if (this.show && currency === currency){
      document.getElementById(currency).style.animation = 'rotating 2s forwards';
    }
    else if (!this.show && currency === currency){
      document.getElementById(currency).style.animation = 'rotatingBack 2s forwards';
    }
    if (currency === 'POLKADOT'){
      currency = 'DOT';
    }
    if (currency === 'MONERO'){
      currency = 'XMR';
    }
    if (currency === 'LITECOIN'){
      currency = 'LTC';
    }
    if (currency === 'CHAINLINK'){
      currency = 'LINK';
    }
    if (currency === 'BITCOIN'){
      currency = 'BTC';
    }
    if (currency === 'TETHER'){
      currency = 'USDT';
    }
    if (currency === 'ETHEREUM'){
      currency = 'ETH';
    }
    if (currency === 'CARDANO'){
      currency = 'ADA';
    }
    if (currency === 'STELLAR'){
      currency = 'XLM';
    }
    if (currency === 'DASH'){
      currency = 'DASH';
    }
    this.chartData = 'KRAKEN:' + currency + base;
  }
}

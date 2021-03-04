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

  public userFav: any[];

  // public favourites = JSON.parse(localStorage.getItem('favList'));
  // public showOrNot = false;


  constructor(private cryptocurrency: CryptocurrenciesService,
              public firebaseService: FirebaseService,
              public firebaseDB: FirebaseDBService,
              public router: Router) { }

  ngOnInit(): void {
    this.getUserFav();
    this.getCryptoCurrencies();
  }

  getCryptoCurrencies(): void{
    this.cryptocurrency.getCrypto(this.cryptoCurrencyBase)
      .subscribe(data => {
        this.cryptoCurrencyList = data;
        this.cryptoList = this.cryptoCurrencyList.rates;
      });
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

  getSearch($event: string): void {
    this.cryptoList = this.cryptoCurrencyList.rates.filter(rate => {
      return rate.symbol.toUpperCase().includes($event.toUpperCase());
    });
  }

  isFavourite(base, currency): boolean{
  const favourites = Object.keys(this.userFav);
  for (const fav of favourites){
    if (this.userFav[fav].api === 'cryptocurrencies'){
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

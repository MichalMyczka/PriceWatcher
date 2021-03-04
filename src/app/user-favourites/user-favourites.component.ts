import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';
import {CryptocurrenciesService} from '../services/cryptocurrencies.service';
import {FirebaseService} from '../services/firebase.service';
import {FirebaseDBService} from '../services/firebase-db.service';
import {CurrencyService} from '../services/currency.service';
import {MetalsService} from '../services/metals.service';
import {StocksService} from '../services/stocks.service';
import {Cryptocurrency} from '../models/cryptocurrency.model';
import {Currency} from '../models/currency.model';
import {Metals} from '../models/metals.model';
import {StocksList} from '../models/stockslist.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-favourites',
  templateUrl: './user-favourites.component.html',
  styleUrls: ['./user-favourites.component.css']
})
export class UserFavouritesComponent implements OnInit {
  public userFav: any[];
  public base: string;
  public currency: string;
  public api: string;

  public show = false;
  public chartData = '';
  public temp = '';
  public counter = 0;

  public cryptoCurrencyList: Cryptocurrency;
  public currencyList: Currency;
  public metalsList: Metals;
  public stocksList: StocksList;

  public cryptoList: Array<Cryptocurrency> = [];
  public curList: Array<Currency> = [];
  public metList: Array<Metals> = [];
  public stoList: Array<StocksList> = [];

  constructor(private cryptocurrency: CryptocurrenciesService,
              public firebaseService: FirebaseService,
              public firebaseDB: FirebaseDBService,
              private currencyService: CurrencyService,
              private metalsService: MetalsService,
              private stocksService: StocksService,
              public router: Router
              ) { }

  ngOnInit(): void {
    this.getUserFav();
  }

  async getUserFav(): Promise<any>{
    const currUID = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + currUID + '/favourites/').once('value').then(
      (snapshot) => {
        this.userFav = snapshot.val();
        this.loadData();
      })
      .catch((error) => {
        console.log('Fetching Error', error);
      });
  }

  loadData(): void{
    const favourites = Object.keys(this.userFav);
    for (const fav of favourites){
      if ( this.userFav[fav].api === 'cryptocurrencies'){
        this.cryptocurrency.getCrypto(this.userFav[fav].base, this.userFav[fav].currency)
          .subscribe(data => {
            this.cryptoCurrencyList = data;
            this.cryptoList.push(this.cryptoCurrencyList);
          });
      }
      else if (this.userFav[fav].api === 'currencies'){
        this.currencyService.getCurrencies(this.userFav[fav].base, this.userFav[fav].currency)
          .subscribe(data => {
            this.currencyList = data;
            this.curList.push(this.currencyList);
          });
      }
      else if (this.userFav[fav].api === 'metal'){
        this.metalsService.getMetals(this.userFav[fav].base, this.userFav[fav].currency)
          .subscribe(data => {
            this.metalsList = data;
            this.metList.push(this.metalsList);
          });
      }
      else if (this.userFav[fav].api === 'stock'){
        this.stocksService.getStocks(this.userFav[fav].currency)
          .subscribe(data => {
            this.stocksList = data;
            this.stoList.push(this.stocksList);
          });
      }
    }
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

  showChartMetals(currency: string, base: string): void {
    this.show = !this.show;
    this.counter ++;
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
    if (this.counter >= 2){
      this.counter = 0;
      this.temp = '';
    }
  }

  showChartCrypto(currency: string, base: string): void {
    this.show = !this.show;
    this.counter ++;
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
    if (this.counter >= 2){
      this.counter = 0;
      this.temp = '';
    }
  }
  showChartCur(currency: string, base: string): void {
    this.show = !this.show;
    this.chartData = 'FX_IDC:' + base + currency ;
    if (this.show && currency === currency){
      document.getElementById(currency).style.animation = 'rotating 2s forwards';
    }
    else if (!this.show && currency === currency){
      document.getElementById(currency).style.animation = 'rotatingBack 2s forwards';
    }
  }
  showChartStock(currency: string, base: string): void {
    this.show = !this.show;
    this.chartData = 'NASDAQ:' + currency ;
    if (this.show && currency === currency){
      document.getElementById(currency).style.animation = 'rotating 2s forwards';
    }
    else if (!this.show && currency === currency){
      document.getElementById(currency).style.animation = 'rotatingBack 2s forwards';
    }
  }
}


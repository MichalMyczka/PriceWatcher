import { Component, OnInit } from '@angular/core';
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
  public cryptoCurrencyList: Cryptocurrency;
  public currencyList: Currency;
  public metalsList: Metals;
  public stocksList: StocksList;

  constructor(private cryptocurrency: CryptocurrenciesService,
              public firebaseService: FirebaseService,
              public firebaseDB: FirebaseDBService,
              private currencyService: CurrencyService,
              private metalsService: MetalsService,
              private stocksService: StocksService
              ) { }

  ngOnInit(): void {
    this.getUserFav();
  }

  async getUserFav(): Promise<any>{
    const currUID = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + currUID + '/favourites/').once('value').then(
      (snapshot) => {
        this.userFav = snapshot.val();
        console.log(this.userFav);
        this.loadData();
      })
      .catch((error) => {
        console.log('Fetching Error', error);
      });
  }

  async loadData(){
    console.log(this.userFav);
    for (let fav of this.userFav){
      console.log(fav);
      if ( fav.api === 'cryptocurrencies'){
        // let x = this.cryptocurrency.getCrypto(this.userFav[fav].base, this.userFav[fav].currency);
        this.cryptocurrency.getCrypto(this.userFav[fav].base, this.userFav[fav].currency)
          .subscribe(data => {
            this.cryptoCurrencyList = data;
            console.log(data);
          });
      }
      else if (fav.api === 'currencies'){
        this.currencyService.getCurrencies(this.userFav[fav].base, this.userFav[fav].currency)
          .subscribe(data => {
            this.currencyList = data;
            console.log(data);
          });
      }
      else if (fav.api === 'metal'){
        this.metalsService.getMetals(this.userFav[fav].base, this.userFav[fav].currency)
          .subscribe(data => {
            this.metalsList = data;
            console.log(data);
          });
      }
      else if (fav.api === 'stock'){
        this.stocksService.getStocks(this.userFav[fav].currency)
          .subscribe(data => {
            this.stocksList = data;
            console.log(data);
          });
      }
    }
  }
}

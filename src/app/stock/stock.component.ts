import { Component, OnInit } from '@angular/core';
import {StocksService} from '../services/stocks.service';
import {StocksList} from '../models/stockslist.model';
import {FirebaseService} from '../services/firebase.service';
import {FirebaseDBService} from '../services/firebase-db.service';
import {Stocks} from '../models/stocks.model';
import firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  public stocksList: StocksList;
  public stockBase: string;
  public rates: any[];
  public stockSearch: Stocks[] = [];
  public show = false;
  public chartData = '';
  public userFav: any[];

  constructor(private stocks: StocksService, public firebaseService: FirebaseService, public firebaseDB: FirebaseDBService,
              public router: Router) { }

  ngOnInit(): void {
    this.getUserFav();
    this.getStocksToList();
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

  getStocksToList(): void{
    this.stocks.getStocks(this.stockBase)
      .subscribe(data => {
        this.stocksList = data;
        this.stockSearch = this.stocksList.stock;
      });
  }

  getSearch($event: string) {
    this.stockSearch = this.stocksList.stock.filter(rate => {
      return rate.symbol.includes( $event.toUpperCase()) || rate.name.toUpperCase().includes($event.toUpperCase());
    });
  }

  showChart(currency: string, base: string): void {
    this.show = !this.show;
    this.chartData = 'NASDAQ:' + currency ;
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
      if (this.userFav[fav].api === 'stock'){
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

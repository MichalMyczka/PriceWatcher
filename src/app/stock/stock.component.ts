import { Component, OnInit } from '@angular/core';
import {StocksService} from '../services/stocks.service';
import {StocksList} from '../models/stockslist.model';
import {FirebaseService} from '../services/firebase.service';
import {FirebaseDBService} from '../services/firebase-db.service';
import {Stocks} from '../models/stocks.model';

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

  constructor(private stocks: StocksService, public firebaseService: FirebaseService, public firebaseDB: FirebaseDBService) { }

  ngOnInit(): void {
    this.getStocksToList();
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
}

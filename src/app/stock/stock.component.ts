import { Component, OnInit } from '@angular/core';
import {StocksService} from '../services/stocks.service';
import {StocksList} from '../models/stockslist.model';
import {FirebaseService} from '../services/firebase.service';
import {FirebaseDBService} from '../services/firebase-db.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  public stocksList: StocksList;
  public stockBase: string;
  public rates: any[];

  constructor(private stocks: StocksService, public firebaseService: FirebaseService, public firebaseDB: FirebaseDBService) { }

  ngOnInit(): void {
    this.getStocksToList();
  }

  getStocksToList(): void{
    this.stocks.getStocks(this.stockBase)
      .subscribe(data => {
        this.stocksList = data;
      });
  }
}

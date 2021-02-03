import { Component, OnInit } from '@angular/core';
import {StocksService} from '../services/stocks.service';
import {Stocks} from '../models/stocks.model';
import {StocksList} from '../models/stockslist.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  public stocksList: StocksList;

  constructor(private stocks: StocksService) { }

  ngOnInit(): void {
    this.getStocksToList();
  }

  getStocksToList(): void{
    this.stocks.getStocks()
      .subscribe(data => this.stocksList = data);
  }
}

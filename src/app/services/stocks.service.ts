import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {StocksList} from '../models/stockslist.model';
import {Currency} from '../models/currency.model';
import {map} from 'rxjs/operators';
import {CurrencyRate} from '../models/currency-rates.model';
import {Stocks} from '../models/stocks.model';

@Injectable({
  providedIn: 'root'
})
export class StocksService {


  constructor(private http: HttpClient) { }

  getStocks(stocksBase = 'AAPL,FB,GOOG,TSLA,MSFT,AMZN,BABA,TSM,V,JNJ'): Observable<StocksList>{
    return this.http.get<StocksList>(`${environment.stocksApiUrl}/${stocksBase}?${environment.stocksApiKey}`).pipe(
      map(result => {
        const stock: StocksList = {
          stock: []
        };
        // @ts-ignore
        for (const rate of result){
          const stockObject: Stocks = {
            symbol: rate.symbol,
            name: rate.name,
            price: rate.price,
            changesPercentage: rate.changesPercentage
          };
          stock.stock.push(stockObject);
        }
        return stock;
      })
    );
  }
}

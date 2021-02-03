import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {StocksList} from '../models/stockslist.model';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  public stocksBase: string;

  constructor(private http: HttpClient) { }

  getStocks(): Observable<StocksList>{
    this.stocksBase = 'AAPL,FB,GOOG,TSLA,MSFT,AMZN,BABA,TSM,V,JNJ';
    return this.http.get<StocksList>(`${environment.stocksApiUrl}/${this.stocksBase}?${environment.stocksApiKey}`);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Metals} from './models/metals.model';
import {environment} from '../environments/environment';
import {Currency} from './models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  public currencyBase: string;

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<Currency>{
    this.currencyBase = 'GBP';
    return this.http.get<Currency>(`${environment.currencyApiUrl}?${environment.bloombergRapidApiKey}&from=${this.currencyBase}`);
  }
}

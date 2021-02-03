import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Currency} from '../models/currency.model';
import {map} from 'rxjs/operators';
import {Rate} from '../models/rate.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrencies(currencyBase = 'USD'): Observable<Currency>{
    return this.http.get<Currency>(`${environment.currencyApiUrl}?${environment.bloombergRapidApiKey}&from=${currencyBase}`).pipe(
      map(result => {
        let currency: Currency = {
          amount: result.amount,
          base_currency_code: result.base_currency_code,
          base_currency_name: result.base_currency_name,
          rates: []
        };
        for (let rate of Object.keys(result.rates)){
          let rateObject: Rate = {
            base: rate,
            rate: result.rates[rate].rate
          };
          currency.rates.push(rateObject);
        }
        console.log(currency);
        return currency;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Currency} from '../models/currency.model';
import {map} from 'rxjs/operators';
import {CurrencyRate} from '../models/currency-rates.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrencies(currencyBase = 'USD', currencyRate = ''): Observable<Currency>{
    return this.http.get<Currency>(`${environment.currencyApiUrl}?${environment.bloombergRapidApiKey}&from=${currencyBase}&to=${currencyRate}`).pipe(
      map(result => {
        const currency: Currency = {
          amount: result.amount,
          base_currency_code: result.base_currency_code,
          base_currency_name: result.base_currency_name,
          rates: []
        };
        for (const rate of Object.keys(result.rates)){
          const rateObject: CurrencyRate = {
            base: rate,
            rate: result.rates[rate].rate,
            name: result.rates[rate].currency_name
          };
          currency.rates.push(rateObject);
        }
        return currency;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Cryptocurrency} from '../models/cryptocurrency.model';
import {map} from 'rxjs/operators';
import {CryptocurrencyBase} from '../models/cryptocurrencybase.model';
import {CryptocurrencyRates} from '../models/cryptocurrency-rates.model';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrenciesService {

  constructor(private http: HttpClient) { }

  getCrypto(cryptoCurrencyBase = 'USD'): Observable<Cryptocurrency>{
    return this.http.get<Cryptocurrency>(`${environment.cryptocurrencyApiUrl}${environment.cryptocurrenciesNameUrl}&vs_currencies=${cryptoCurrencyBase}`).pipe(
      map(result => {
        const crypto: Cryptocurrency = {
          rates: [],
        };
        for (const rate of Object.keys(result)) {
          const rateObject: CryptocurrencyBase = {
            symbol: rate,
            rate: [],
          };
          for (const inside of Object.keys(result[rate])){
            const insideRate: CryptocurrencyRates = {
              rateSymbol: inside,
              ratePrice: result[rate][inside],
            };
            rateObject.rate.push(insideRate);
          }
          crypto.rates.push(rateObject);
        }
        return  crypto;
      })
    );
  }
}

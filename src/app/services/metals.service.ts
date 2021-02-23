import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Metals} from '../models/metals.model';
import {MetalsRates} from '../models/metals-rates.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetalsService {

  constructor(private http: HttpClient) { }

  getMetals(currencyBase = 'USD', searchedMetals = environment.allMetalsUrl): Observable<Metals>{
    return this.http.get<Metals>(`${environment.metalsApiUrl}${searchedMetals}/${currencyBase}?${environment.bloombergRapidApiKey}`).pipe(
      map(result => {
        const metal: Metals = {
          baseCurrency: result.baseCurrency,
          unit: result.unit,
          rates: []
        };
        for (const rate of Object.keys(result.rates)) {
          const rateObject: MetalsRates = {
            symbol: rate,
            rate: result.rates[rate],
          };
          metal.rates.push(rateObject);
        }
        return  metal;
      })
    );
  }
}

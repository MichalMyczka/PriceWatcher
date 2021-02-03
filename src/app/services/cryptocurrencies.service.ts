import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Cryptocurrency} from '../models/cryptocurrency.model';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrenciesService {

  public cryptoCurrencyBase: string;

  constructor(private http: HttpClient) { }

  getCrypto(): Observable<Cryptocurrency>{
    this.cryptoCurrencyBase = 'USD';
    return this.http.get<Cryptocurrency>(`${environment.cryptocurrencyApiUrl}${environment.cryptocurrenciesNameUrl}&vs_currencies=${this.cryptoCurrencyBase}`);
  }
}

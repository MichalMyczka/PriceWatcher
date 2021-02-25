import { Component, OnInit } from '@angular/core';
import {CryptocurrenciesService} from '../services/cryptocurrencies.service';
import {Cryptocurrency} from '../models/cryptocurrency.model';
import {FirebaseService} from '../services/firebase.service';
import {FirebaseDBService} from '../services/firebase-db.service';

@Component({
  selector: 'app-cryptocurrencies',
  templateUrl: './cryptocurrencies.component.html',
  styleUrls: ['./cryptocurrencies.component.css']
})
export class CryptocurrenciesComponent implements OnInit {

  public cryptoCurrencyList: Cryptocurrency;
  public cryptoCurrencyBase: string;

  constructor(private cryptocurrency: CryptocurrenciesService, public firebaseService: FirebaseService, public firebaseDB: FirebaseDBService) { }

  ngOnInit(): void {
    this.getCryptoCurrencies();
  }

  getCryptoCurrencies(): void{
    this.cryptocurrency.getCrypto(this.cryptoCurrencyBase)
      .subscribe(data => {
        this.cryptoCurrencyList = data;
      });
  }

  getSearch($event: string): void {
    this.cryptoCurrencyList.rates = this.cryptoCurrencyList.rates.filter(rate => {
      return rate.symbol.toUpperCase().includes($event.toUpperCase());
    });
  }
}

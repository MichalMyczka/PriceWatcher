import { Component, OnInit } from '@angular/core';
import {CryptocurrenciesService} from '../services/cryptocurrencies.service';
import {Cryptocurrency} from '../models/cryptocurrency.model';
import {FirebaseService} from '../services/firebase.service';
import {FirebaseDBService} from '../services/firebase-db.service';
import {CryptocurrencyRates} from '../models/cryptocurrency-rates.model';
import {CryptocurrencyBase} from '../models/cryptocurrencybase.model';

@Component({
  selector: 'app-cryptocurrencies',
  templateUrl: './cryptocurrencies.component.html',
  styleUrls: ['./cryptocurrencies.component.css']
})
export class CryptocurrenciesComponent implements OnInit {

  public cryptoCurrencyList: Cryptocurrency;
  public cryptoCurrencyBase = 'USD';
  public cryptoList: CryptocurrencyBase[] = [];
  public show = false;
  public chartData = '';
  public temp = '';

  constructor(private cryptocurrency: CryptocurrenciesService,
              public firebaseService: FirebaseService,
              public firebaseDB: FirebaseDBService) { }

  ngOnInit(): void {
    this.getCryptoCurrencies();
  }

  getCryptoCurrencies(): void{
    this.cryptocurrency.getCrypto(this.cryptoCurrencyBase)
      .subscribe(data => {
        this.cryptoCurrencyList = data;
        this.cryptoList = this.cryptoCurrencyList.rates;
      });
  }

  getSearch($event: string): void {
    this.cryptoList = this.cryptoCurrencyList.rates.filter(rate => {
      return rate.symbol.toUpperCase().includes($event.toUpperCase());
    });
  }

  showChart(currency: string, base: string): void {
    this.show = !this.show;
    this.temp = 'COINBASE:' + currency + base;
    if (this.show && currency === currency){
      document.getElementById(currency).style.animation = 'rotating 2s forwards';
    }
    else if (!this.show && currency === currency){
      document.getElementById(currency).style.animation = 'rotatingBack 2s forwards';
    }
    if (currency === 'POLKADOT'){
      currency = 'DOT';
    }
    if (currency === 'MONERO'){
      currency = 'XMR';
    }
    if (currency === 'LITECOIN'){
      currency = 'LTC';
    }
    if (currency === 'CHAINLINK'){
      currency = 'LINK';
    }
    if (currency === 'BITCOIN'){
      currency = 'BTC';
    }
    if (currency === 'TETHER'){
      currency = 'USDT';
    }
    if (currency === 'ETHEREUM'){
      currency = 'ETH';
    }
    if (currency === 'CARDANO'){
      currency = 'ADA';
    }
    if (currency === 'STELLAR'){
      currency = 'XLM';
    }
    if (currency === 'DASH'){
      currency = 'DASH';
    }
    this.chartData = 'KRAKEN:' + currency + base;
  }
}

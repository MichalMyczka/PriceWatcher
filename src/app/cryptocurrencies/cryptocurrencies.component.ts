import { Component, OnInit } from '@angular/core';
import {CryptocurrenciesService} from '../services/cryptocurrencies.service';
import {Cryptocurrency} from '../models/cryptocurrency.model';

@Component({
  selector: 'app-cryptocurrencies',
  templateUrl: './cryptocurrencies.component.html',
  styleUrls: ['./cryptocurrencies.component.css']
})
export class CryptocurrenciesComponent implements OnInit {

  public cryptoCurrencyList: Cryptocurrency;

  constructor(private cryptocurrency: CryptocurrenciesService) { }

  ngOnInit(): void {
    this.getCryptoCurrencies();
    console.log(this.cryptoCurrencyList);
  }

  getCryptoCurrencies(): void{
    this.cryptocurrency.getCrypto()
      .subscribe(data => this.cryptoCurrencyList = data);
  }

}

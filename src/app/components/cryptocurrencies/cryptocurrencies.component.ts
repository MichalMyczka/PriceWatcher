import { Component, OnInit } from '@angular/core';
import {CryptocurrenciesService} from '../../services/cryptocurrencies.service';
import {Cryptocurrency} from '../../models/cryptocurrency.model';

@Component({
  selector: 'app-cryptocurrencies',
  templateUrl: './cryptocurrencies.component.html',
  styleUrls: ['./cryptocurrencies.component.css']
})
export class CryptocurrenciesComponent implements OnInit {

  public cryptoCurrencyList: Cryptocurrency;
  public cryptoCurrencyBase: string;
  public rates: any[];

  constructor(private cryptocurrency: CryptocurrenciesService) { }

  ngOnInit(): void {
    this.getCryptoCurrencies();
  }

  getCryptoCurrencies(): void{
    this.cryptocurrency.getCrypto(this.cryptoCurrencyBase)
      .subscribe(data => {
        this.cryptoCurrencyList = data;
      });
  }

}

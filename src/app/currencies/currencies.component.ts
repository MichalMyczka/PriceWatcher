import { Component, OnInit } from '@angular/core';
import {CurrencyService} from '../services/currency.service';
import {Currency} from '../models/currency.model';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  public currencyList: Currency;
  public rates: any[];
  public currencyBase: string;

  constructor(private currency: CurrencyService) { }

  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies(): void{
    this.currency.getCurrencies(this.currencyBase)
      .subscribe(data => {
        this.currencyList = data;
      });
  }

}

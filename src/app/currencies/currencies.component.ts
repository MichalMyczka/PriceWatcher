import { Component, OnInit } from '@angular/core';
import {CurrencyService} from '../currency.service';
import {Currency} from '../models/currency.model';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  public currencyList: Currency;

  constructor(private currency: CurrencyService) { }

  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies(): void{
    this.currency.getCurrencies()
      .subscribe(data => this.currencyList = data);
  }

}

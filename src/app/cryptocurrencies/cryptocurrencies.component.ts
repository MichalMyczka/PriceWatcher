import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cryptocurrencies',
  templateUrl: './cryptocurrencies.component.html',
  styleUrls: ['./cryptocurrencies.component.css']
})
export class CryptocurrenciesComponent implements OnInit {
  isWhite: boolean;

  constructor() { }

  ngOnInit(): void {
    this.changeStarColor();
  }

  changeStarColor(): void{
    this.isWhite = false;
  }
}

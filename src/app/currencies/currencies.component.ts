import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
  isWhite: boolean;

  constructor() { }

  ngOnInit(): void {
    this.changeStarColor();
  }

  changeStarColor(): void{
    this.isWhite = true;
  }

}

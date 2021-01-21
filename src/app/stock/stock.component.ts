import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  isWhite: boolean;

  constructor() { }

  ngOnInit(): void {
    this.changeStarColor();
  }

  changeStarColor(): void{
    this.isWhite = false;
  }
}

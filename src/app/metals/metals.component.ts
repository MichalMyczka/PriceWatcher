import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metals',
  templateUrl: './metals.component.html',
  styleUrls: ['./metals.component.css']
})
export class MetalsComponent implements OnInit {
  isWhite: boolean;

  constructor() { }

  ngOnInit(): void {
    this.changeStarColor();
  }

  changeStarColor(): void{
    this.isWhite = false;
  }
}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input()
  label;

  @Input()
  list: any[];

  constructor() {
  }

  ngOnInit(): void {
  }

  searchBy(value: string): void {
    this.list.filter(rate => rate.symbol.charAt(0) === value.charAt(0));
    console.log(this.list.filter(rate => rate.symbol === value));
  }
}

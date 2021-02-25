import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  search = '';

  @Input()
  name: string;

  @Output()
  searchOutput = new EventEmitter<string>();
  constructor() { }

  sendSearch(): void {
    this.searchOutput.emit(this.search);
  }
}

import { Component, OnInit } from '@angular/core';
import {MetalsService} from '../../services/metals.service';
import {Metals} from '../../models/metals.model';

@Component({
  selector: 'app-metals',
  templateUrl: './metals.component.html',
  styleUrls: ['./metals.component.css']
})
export class MetalsComponent implements OnInit {

  public metalsList: Metals;
  public rates: any[];
  public currencyBase: string;

  constructor(private metals: MetalsService) { }

  ngOnInit(): void {
    this.getMetals();
  }

  getMetals(): void{
    this.metals.getMetals(this.currencyBase)
      .subscribe(data => {
        this.metalsList = data;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import {MetalsService} from '../services/metals.service';
import {Metals} from '../models/metals.model';
import {FirebaseService} from '../services/firebase.service';
import {FirebaseDBService} from '../services/firebase-db.service';
import {MetalsRates} from '../models/metals-rates.model';
import firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-metals',
  templateUrl: './metals.component.html',
  styleUrls: ['./metals.component.css']
})
export class MetalsComponent implements OnInit {

  public metalsList: Metals;
  public rates: any[];
  public currencyBase = 'USD';
  public metalsSearch: MetalsRates[] = [];
  public show = false;
  public chartData = '';
  public temp = '';
  public userFav: any[];

  constructor(private metals: MetalsService, public firebaseService: FirebaseService, public firebaseDB: FirebaseDBService,
              public router: Router) { }

  ngOnInit(): void {
    this.getUserFav();
    this.getMetals();
  }

  async getUserFav(): Promise<any>{
    const currUID = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + currUID + '/favourites/').once('value').then(
      (snapshot) => {
        this.userFav = snapshot.val();
      })
      .catch((error) => {
        console.log('Fetching Error', error);
      });
  }

  getMetals(): void{
    this.metals.getMetals(this.currencyBase)
      .subscribe(data => {
        this.metalsList = data;
        this.metalsSearch = this.metalsList.rates;
      });
  }

  getSearch($event: string) {
    this.metalsSearch = this.metalsList.rates.filter(rate => {
      return rate.symbol.includes( $event.toUpperCase());
    });
  }

  showChart(currency: string, base: string): void {
    this.show = !this.show;
    this.temp = 'FX_IDC:' + currency + base;
    if (this.show && currency === currency){
      document.getElementById(currency).style.animation = 'rotating 2s forwards';
    }
    else if (!this.show && currency === currency){
      document.getElementById(currency).style.animation = 'rotatingBack 2s forwards';
    }
    if (currency === 'PL'){
      currency = 'XPT';
    }
    if (currency === 'PA'){
      currency = 'XPD';
    }
    this.chartData = 'FX_IDC:' + currency + base;
  }

  isFavourite(base, currency): boolean{
    const favourites = Object.keys(this.userFav);
    for (const fav of favourites){
      if (this.userFav[fav].api === 'metal'){
        if (this.userFav[fav].base.toUpperCase() === base.toUpperCase()
          && this.userFav[fav].currency.toUpperCase() === currency.toUpperCase()){
          return true;
        }
      }
    }
    return false;
  }

  removeFromFav(base, rateSymbol): void{
    const currUID = firebase.auth().currentUser.uid;
    const favourites = Object.keys(this.userFav);
    for (const fav of favourites) {
      if (this.userFav[fav].base === base && this.userFav[fav].currency === rateSymbol){
        firebase.database().ref('/users/' + currUID + '/favourites/' + fav).remove();
      }
    }
    this.reloadComponent();
  }

  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}

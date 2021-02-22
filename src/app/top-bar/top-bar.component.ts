import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  topBarContent: ['currencies', 'cryptocurrencies', 'metals', 'stock'];

  constructor(public firebaseService: FirebaseService, public router: Router) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.firebaseService.logout();
    location.reload();
  }

  refresh(){
    location.reload();
  }

}

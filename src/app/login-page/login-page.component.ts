import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';
import {FirebaseDBService} from '../services/firebase-db.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(public firebaseService: FirebaseService, public router: Router, public firebaseDB: FirebaseDBService) { }

  ngOnInit(): void {
  }

  async onSignin(email: string, password: string){
    try{
      await this.firebaseService.signIn(email, password);
      if (this.firebaseService.isLoggedIn) {
        await this.router.navigateByUrl('/profile');
      }
    }
    catch (error){
      alert(error.message);
    }
  }
}

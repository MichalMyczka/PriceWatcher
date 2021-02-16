import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  isSignedIn = false;
  constructor(public firebaseService: FirebaseService, public router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    }
    else {
      this.isSignedIn = false;
    }
  }

  async onSignin(email: string, password: string){
    await this.firebaseService.signIn(email, password);
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
      await this.router.navigateByUrl('/profile');
    }
  }

}

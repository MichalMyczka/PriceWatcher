import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = localStorage.getItem('loggedIn');

  constructor(public firebaseAuth: AngularFireAuth, public router: Router) { }

  signIn(email: string, password: string): void{
    this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = 'true';
        localStorage.setItem('loggedIn', String(true));
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigateByUrl('/profile');
      });
  }

  signUp(email: string, password: string): void{
    this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(() => {
      console.log('sign up');
    });
  }

  logout(): void{
    this.firebaseAuth.signOut();
    this.isLoggedIn = 'false';
    localStorage.removeItem('user');
    localStorage.setItem('loggedIn', String(false));
    this.router.navigateByUrl('/landingPage');
  }

  addToFav(baseCurrency, rate, currency) {
    const currUID = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + currUID + '/favourites/').push({
      currency: rate,
      base: baseCurrency,
      api: currency
    });
    this.reloadComponent();
  }

  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}

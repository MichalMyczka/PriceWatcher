import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = localStorage.getItem('loggedIn');

  constructor(public firebaseAuth: AngularFireAuth, public router: Router) { }

  signIn(email: string, password: string): void{
    // TODO https://firebase.google.com/docs/auth/web/auth-state-persistence#:~:text=You%20can%20specify%20how%20the,or%20cleared%20on%20page%20reload.
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
    localStorage.removeItem('user');
    localStorage.setItem('loggedIn', String(false));
  }
}

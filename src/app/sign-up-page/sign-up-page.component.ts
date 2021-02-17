import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {FirebaseDBService} from '../services/firebase-db.service';
import firebase from 'firebase';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  constructor(public firebaseService: FirebaseService, public firebaseDB: FirebaseDBService) { }

  ngOnInit(): void {
  }

  async onSignup(email: string, password: string, nickname: string){
    await this.firebaseService.signUp(email, password);
    alert('account created'); // TODO better info about account
    const uid = firebase.auth().currentUser.uid;
    await firebase.database().ref('users/' + uid).set({
      email: email,
      nickname: nickname,
      imageUrl: environment.defaultAvatar,
    });
  }

}

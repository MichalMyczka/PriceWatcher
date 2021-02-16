import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    console.log(localStorage.getItem('user'));
    const currUID = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + currUID).once('value').then(
      (snapshot) => {
        const fetchedData = snapshot.val();

        const name = document.getElementById('userName');
        name.setAttribute('placeholder', fetchedData.name);
        const surname = document.getElementById('userSurname');
        surname.setAttribute('placeholder', fetchedData.surname);
        const email = document.getElementById('userEmail');
        email.setAttribute('placeholder', fetchedData.email);
        const nickname = document.getElementById('userNickname');
        nickname.setAttribute('placeholder', fetchedData.nickname);
      })
  .catch((error) => {
      console.log('Fetching Error', error);
    });
  }
}



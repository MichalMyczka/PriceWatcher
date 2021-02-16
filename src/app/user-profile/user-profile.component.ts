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
  }

  getUserData() {
    console.log(localStorage.getItem('user'));
    const currUID = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + currUID).once('value').then(
      (snapshot) => {
        const fetchedData = snapshot.val();
        return fetchedData;
        // console.log(fetchedData.email);
        // const fetchedEmail = fetchedData.email;
        // const fetchedNickname = fetchedData.nickname;
        // const fetchedName = fetchedData.name;
        // const fetchedSurname = fetchedData.surname;
      })
  .catch((error) => {
      console.log('Fetching Error', error);
    });
  }
}

// firebase.database().ref('users').child(uid).once('value')
//   .then((data) => {
//     let fetchedData = data.val()
//     console.log('Fetched Data', fetchedData)
//   })
//   .catch((error) => {
//     console.log('Fetching Error', error)
//   })

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

        if (fetchedData.name !== undefined){
          const name = document.getElementById('userName');
          name.setAttribute('value', fetchedData.name);
        }

        if (fetchedData.surname !== undefined){
          const surname = document.getElementById('userSurname');
          surname.setAttribute('value', fetchedData.surname);
        }

        document.getElementById('userEmail').innerText = fetchedData.email;

        let photo = document.getElementById('userImage');
        console.log(fetchedData.imageUrl);
        photo.setAttribute('src', fetchedData.imageUrl);

        const nickname = document.getElementById('userNickname');
        nickname.setAttribute('value', fetchedData.nickname);

      })
      .catch((error) => {
        console.log('Fetching Error', error);
      });
  }
  async UpdateData(name: string, surname: string, nickname: string) {
    const currUID = firebase.auth().currentUser.uid;
    await firebase.database().ref('/users/' + currUID).update({
      name: name,
      nickname: nickname,
      surname: surname
    });
  }
}



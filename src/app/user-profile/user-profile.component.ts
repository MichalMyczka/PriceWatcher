import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userName: string;
  imagePath: string;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.getUserData();
  }

  async getUserData(): Promise<any>{
    const currUID = firebase.auth().currentUser.uid;

    // TODO change with usage of TWO WAY DATA BINDING
    return firebase.database().ref('/users/' + currUID).once('value').then(
      (snapshot) => {
        const fetchedData = snapshot.val();

        if (fetchedData.name !== undefined){
          this.userName = fetchedData.name;
        }

        if (fetchedData.surname !== undefined){
          const surname = document.getElementById('userSurname');
          surname.setAttribute('value', fetchedData.surname);
        }

        document.getElementById('userEmail').innerText = fetchedData.email;

        this.imagePath = fetchedData.imageUrl;

        const nickname = document.getElementById('userNickname');
        nickname.setAttribute('value', fetchedData.nickname);
      })
      .catch((error) => {
        console.log('Fetching Error', error);
      });
  }
  async UpdateData(name: string, surname: string, nickname: string): Promise<any> {
    const currUID = firebase.auth().currentUser.uid;
    await firebase.database().ref('/users/' + currUID).update({
      name,
      nickname,
      surname
    });
    this.reloadComponent();
  }

  async uploadNewImage(imageInput: any): Promise<any>{
    const uid = firebase.auth().currentUser.uid;
    const uploader = document.getElementById('uploader');
    const file = imageInput.files.shift();

    const storageRef = firebase.storage().ref('img/' + file.name);
    const task = storageRef.put(file);


    task.on('state_changed', function progress(snapshot): void {
      const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.setAttribute('value', String(percentage));

    }, function error(err): void {
        alert(err.message);

    }, function complete(): void {
      storageRef.getDownloadURL()
        .then((imageUrl) => {
          firebase.database().ref('/users/' + uid).update({
            imageUrl
          }).catch(error => console.error(error));
        });
    });
  }

  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]).catch(error => console.error(error));
  }
}



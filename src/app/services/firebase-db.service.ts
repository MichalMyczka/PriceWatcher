import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDBService {
  public users: Observable<any>[];
  constructor(afDB: AngularFireDatabase) {
    const itemsRef: AngularFireList<any> = afDB.list('users');
    itemsRef.valueChanges().subscribe(
      x => {this.users = x; }
    );
  }
}

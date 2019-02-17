import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;

const config = {
  apiKey: 'AIzaSyAe5zBz3OKXI5PDWGdg3J4sKpzgUO1QXAw',
  authDomain: 'circleci-firebase.firebaseapp.com',
  databaseURL: 'https://circleci-firebase.firebaseio.com',
  projectId: 'circleci-firebase',
  storageBucket: 'circleci-firebase.appspot.com',
  messagingSenderId: '541569099484'
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() {
    firebase.initializeApp(config);
  }

  public login(): Promise<UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return firebase.auth().signInWithPopup(provider);
  }
}

import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public user;

  constructor(public afAuth: AngularFireAuth) {
  }

  public async login() {
    const result = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.user = result.user;
  }

  public logout() {
    this.afAuth.auth.signOut().then(() => {
      this.user = null;
    });
  }
}

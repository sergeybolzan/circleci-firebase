import {Component} from '@angular/core';
import {FirebaseService} from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public user;

  constructor(private firebaseService: FirebaseService) {
  }

  public login(): void {
    this.firebaseService.login().then((result) => {
      this.user = result.user;
    });
  }

  public logout(): void {
    console.log('logout on hosting');
  }
}

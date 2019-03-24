import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
  }

  public async logout() {
    await this.afAuth.auth.signOut();
  }

}

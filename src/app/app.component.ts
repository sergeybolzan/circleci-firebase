import {Component} from '@angular/core';

export interface Todo {
  id: string;
  header: string;
  description: string;
  done: boolean;
  attachments: string[];
}

export interface User {
  displayName: string;
  photoURL: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

}

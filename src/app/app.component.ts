import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
  private todosCollection: AngularFirestoreCollection<Todo>;
  public todos: Observable<Todo[]>;
  public user: User;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.todosCollection = db.collection<Todo>('todos');
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Todo;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  public async login() {
    const result = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.user = result.user;
  }

  public async logout() {
    await this.afAuth.auth.signOut();
    this.user = null;
  }

  public toggleTodo(todo: Todo): void {
    this.todosCollection.doc(todo.id).update({done: !todo.done}).catch(() => console.log('Missing permissions'));
  }

  public addTodo(): void {
    this.todosCollection.add({header: 'todo2', description: 'todo2descr', done: false, attachments: []} as Todo);
  }
}

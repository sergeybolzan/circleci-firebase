import {Component} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Todo, User} from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
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

  public toggleTodo(todo: Todo): void {
    this.todosCollection.doc(todo.id).update({done: !todo.done}).catch(() => console.log('Missing permissions'));
  }

  public addTodo(): void {
    this.todosCollection.add({header: 'todo2', description: 'todo2descr', done: false, attachments: []} as Todo);
  }
}

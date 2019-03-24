import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SecretComponent} from './secret/secret.component';
import {AuthGuard} from './auth.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'secret', component: SecretComponent, canActivate: [AuthGuard]}
];

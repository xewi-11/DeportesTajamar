import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { HomeComponent } from './components/header/header';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
   { path: '', redirectTo: 'home', pathMatch: 'full' }
];

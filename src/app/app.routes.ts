import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Login },              // default login
  { path: 'dashboard', component: Dashboard } // dashboard route
];

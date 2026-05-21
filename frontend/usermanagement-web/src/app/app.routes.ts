import { Routes } from '@angular/router';
import { UserManagement } from './user-management/user-management';

export const routes: Routes = [
  { path: 'user-management', component: UserManagement },
  { path: '**', redirectTo: '' },
];

import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () => import('./components/user-directory/user-directory.component').then(m => m.UserDirectoryComponent)
  },
  {
    path: 'users/new',
    canActivate: [authGuard],
    loadComponent: () => import('./components/add-user/add-user.component').then(m => m.AddUserComponent)
  },
  {
    path: 'users/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./components/user-detail-page/user-detail-page.component').then(m => m.UserDetailPageComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent)
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: 'users' }
];

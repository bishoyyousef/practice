import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);

  // Initialize signal from localStorage value
  readonly isLoggedIn = signal<boolean>(localStorage.getItem('isLoggedIn') === 'true');

  login(): void {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn.set(true);
    this.router.navigate(['/users']);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}

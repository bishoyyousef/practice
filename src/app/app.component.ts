import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HighlightDirective } from './directives/highlight.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HighlightDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authService = inject(AuthService);

  // Bind signals for the template shell
  isLoggedIn = this.authService.isLoggedIn;

  logout(): void {
    this.authService.logout();
  }
}

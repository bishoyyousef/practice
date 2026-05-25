import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  userModel = {
    name: '',
    email: '',
    role: 'user' as 'admin' | 'editor' | 'viewer' | 'user',
    status: 'online' as 'online' | 'away' | 'offline',
    bio: ''
  };

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.userService.create(this.userModel).subscribe({
      next: () => {
        this.notificationService.show('User created', 'success');
        // Redirect back to users directory page
        this.router.navigate(['/users']);
      }
    });
  }
}

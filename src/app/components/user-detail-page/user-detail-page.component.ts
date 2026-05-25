import { Component, OnInit, inject, signal, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../users.data';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [DatePipe],
  templateUrl: './user-detail-page.component.html'
})
export class UserDetailPageComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private datePipe = inject(DatePipe);

  // Modern input route binding
  @Input() id!: string;

  user = signal<any | null>(null);
  isFavorite = signal<boolean>(false);

  ngOnInit(): void {
    if (this.id) {
      this.fetchUser(this.id);
    } else {
      this.router.navigate(['/users']);
    }
  }

  private fetchUser(id: string | number): void {
    this.userService.getOne(id).subscribe({
      next: (data) => {
        this.user.set(data);
      },
      error: () => {
        // Redirection on error
        this.router.navigate(['/users']);
      }
    });
  }

  onToggleFavorite(): void {
    this.isFavorite.update(val => !val);
  }

  getFormattedDate(): string {
    const joined = this.user()?.joinedAt;
    if (!joined) return '';
    return this.datePipe.transform(joined, 'longDate') || '';
  }
}

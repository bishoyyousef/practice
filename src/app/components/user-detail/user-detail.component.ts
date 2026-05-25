import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { User } from '../../users.data';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  @Input() user: User | null = null;
  @Output() toggleFavorite = new EventEmitter<User>();
  @Output() clearSelection = new EventEmitter<void>();

  isFavorite = false;

  onToggleFavorite() {
    if (this.user) {
      this.isFavorite = !this.isFavorite;
      this.toggleFavorite.emit(this.user);
    }
  }

  onClearSelection() {
    this.clearSelection.emit();
  }

  getFormattedDate(): string {
    if (!this.user?.joinedAt) return '';
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(this.user.joinedAt, 'longDate') || '';
  }
}

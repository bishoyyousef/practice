import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../users.data';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './user-card.component.html'
})
export class UserCardComponent {
  @Input({ required: true }) user!: User;
  @Input() isActive: boolean = false;
  
  @Output() selectUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();

  onSelect() {
    this.selectUser.emit(this.user);
  }

  onDelete(event: Event) {
    event.stopPropagation();
    this.deleteUser.emit(this.user);
  }
}

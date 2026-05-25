import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, USERS_DATA } from './users.data';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, UserCardComponent, UserDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  users = signal<User[]>(USERS_DATA);
  searchQuery = signal<string>('');
  selectedUser = signal<User | null>(null);

  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.users();
    return this.users().filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      (user.role?.toLowerCase().includes(query) ?? false)
    );
  });

  filteredCount = computed(() => this.filteredUsers().length);

  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }

  onSelectUser(user: User) {
    this.selectedUser.set(user);
  }

  onDeleteUser(userToDelete: User) {
    this.users.update(users => users.filter(u => u.id !== userToDelete.id));
    if (this.selectedUser()?.id === userToDelete.id) {
      this.selectedUser.set(null);
    }
  }

  onToggleFavorite(user: User) {
    console.log(`User favorite status toggled for: ${user.name}`);
  }

  onClearSelection() {
    this.selectedUser.set(null);
  }
}

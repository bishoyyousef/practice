import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '../../users.data';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-directory',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, UserCardComponent, UserDetailComponent],
  templateUrl: './user-directory.component.html',
  styleUrl: './user-directory.component.css'
})
export class UserDirectoryComponent implements OnInit {
  private userService = inject(UserService);

  allUsers = signal<User[]>([]);
  searchQuery = signal<string>('');
  selectedUser = signal<User | null>(null);

  // Client-side layout filtering by name
  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.allUsers();
    return this.allUsers().filter(user => 
      user.name.toLowerCase().includes(query)
    );
  });

  filteredCount = computed(() => this.filteredUsers().length);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.allUsers.set(data);
        
        // Keep selected user details in sync
        const currentSelected = this.selectedUser();
        if (currentSelected) {
          const found = data.find(u => u.id === currentSelected.id);
          this.selectedUser.set(found || null);
        }
      }
    });
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
  }

  onSelectUser(user: User): void {
    this.selectedUser.set(user);
  }

  onDeleteUser(userToDelete: User): void {
    // Native confirm dialog check
    const isConfirmed = confirm(`Are you sure you want to delete ${userToDelete.name}?`);
    if (!isConfirmed) return;

    this.userService.remove(userToDelete.id).subscribe({
      next: () => {
        // Refresh local layout
        this.loadUsers();
        if (this.selectedUser()?.id === userToDelete.id) {
          this.selectedUser.set(null);
        }
      }
    });
  }

  onToggleFavorite(user: User): void {
    // Keep it silent or log
    console.log(`Toggled favorite for: ${user.name}`);
  }

  onClearSelection(): void {
    this.selectedUser.set(null);
  }

  onRefresh(): void {
    this.searchQuery.set('');
    this.loadUsers();
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../users.data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000'; // Hardcoded base API URL

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getOne(id: number | string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  create(user: Omit<User, 'id' | 'avatarUrl' | 'joinedAt'> & { avatarUrl?: string; joinedAt?: string }): Observable<User> {
    const joinedAt = user.joinedAt || new Date().toISOString().split('T')[0];
    const newUser = { ...user, joinedAt };
    return this.http.post<User>(`${this.apiUrl}/users`, newUser);
  }

  update(id: number | string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  remove(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}

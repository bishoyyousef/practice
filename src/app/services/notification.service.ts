import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly toasts = signal<Toast[]>([]);
  private nextId = 0;

  show(message: string, type: 'success' | 'error' | 'info' = 'success', duration = 4000): void {
    const id = this.nextId++;
    const newToast: Toast = { id, message, type };
    
    // Add new toast
    this.toasts.update(toasts => [...toasts, newToast]);

    // Auto dismiss
    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  remove(id: number): void {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email],
      [this.emailUniqueValidator()]
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(8)]
    ],
    age: [
      null,
      [Validators.required, Validators.min(18)]
    ]
  });

  // Async Validator to check if email is taken
  private emailUniqueValidator() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      // debounce checking slightly to save requests
      return timer(400).pipe(
        switchMap(() => 
          this.http.get<any[]>(`http://localhost:3000/takenEmails?email=${encodeURIComponent(control.value)}`).pipe(
            map(res => (res.length > 0 ? { emailTaken: true } : null)),
            catchError(() => of(null))
          )
        )
      );
    };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const { email, password, age } = this.registerForm.value;

    // Lock the email in takenEmails and create the user profile
    this.http.post('http://localhost:3000/takenEmails', { email }).subscribe({
      next: () => {
        const mockProfile = {
          name: email.split('@')[0],
          email,
          role: 'user' as const,
          status: 'online' as const,
          bio: `Registered new member. Age: ${age}`
        };

        this.userService.create(mockProfile).subscribe({
          next: () => {
            this.router.navigate(['/login']);
          }
        });
      }
    });
  }
}

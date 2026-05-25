import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  profileForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    bio: [''],
    skills: this.fb.array([])
  });

  showSuccess = signal<boolean>(false);

  // Getter for the skills FormArray
  get skills(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile(): void {
    // Treat User 1 as mock logged-in user
    this.userService.getOne(1).subscribe({
      next: (user: any) => {
        this.profileForm.patchValue({
          name: user.name,
          bio: user.bio || ''
        });

        this.skills.clear();

        if (user.skills && Array.isArray(user.skills)) {
          user.skills.forEach((skill: string) => {
            this.skills.push(this.fb.control(skill, Validators.required));
          });
        }
      }
    });
  }

  addSkill(): void {
    // Append new empty required skill row
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number): void {
    // Remove skill row dynamically
    this.skills.removeAt(index);
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    // Fetch existing user to preserve fields and prevent overwrite
    this.userService.getOne(1).subscribe({
      next: (currentUser: any) => {
        const payload = {
          ...currentUser,
          name: this.profileForm.value.name,
          bio: this.profileForm.value.bio,
          skills: this.profileForm.value.skills
        };

        this.userService.update(1, payload).subscribe({
          next: () => {
            this.showSuccess.set(true);
            // Dismiss banner after 4 seconds
            setTimeout(() => this.showSuccess.set(false), 4000);
          }
        });
      }
    });
  }
}

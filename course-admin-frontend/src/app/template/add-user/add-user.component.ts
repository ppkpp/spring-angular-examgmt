import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    ReactiveFormsModule, // Add ReactiveFormsModule
    FormsModule,
    CommonModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  // Define the form group, and tell TypeScript that it will be initialized later
  isEditMode = false;
  createUserForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the reactive form
    this.createUserForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        retypePassword: ['', [Validators.required]],
        role: ['teacher', Validators.required],
        phone: ['', [Validators.required]], // Phone number validation (10 digits)
        email: ['', [Validators.required, Validators.email]],
        active: [true], // Default value
      },
      { validators: this.passwordMatchValidator }
    );

    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode = true;
      this.loadUser(parseInt(userId));
    }
  }

  loadUser(id: number): void {
    this.userService.getUserById(id).subscribe((user) => {
      this.createUserForm.patchValue({
        ...user,
        retypePassword: user.password, // Or blank if you don't show password
      });
    });
    this.createUserForm.get('password')?.disable();
    this.createUserForm.get('retypePassword')?.disable();
  }
  // Custom validator to check if password and retypePassword match
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const retypePassword = group.get('retypePassword')?.value;
    return password && retypePassword && password !== retypePassword
      ? { mismatch: true }
      : null;
  }

  onSubmit(): void {
    if (this.createUserForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    const userId = this.route.snapshot.paramMap.get('id');
    const userData = this.createUserForm.value;
    delete userData.retypePassword;

    if (this.isEditMode && userId) {
      delete userData.password; // do not update password
      this.userService.updateUser(userId, userData).subscribe({
        next: () => {
          this.successMessage = 'User updated successfully.';
          this.createUserForm.reset();
          this.router.navigate(['/user-list']);
        },
        error: (error) => {
          this.errorMessage =
            'Failed to update user: ' + (error.error?.message || error.message);
          console.error('Error:', error);
        },
      });
    } else {
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.successMessage = 'User created successfully.';
          this.createUserForm.reset();
          this.router.navigate(['/user-list']);
        },
        error: (error) => {
          this.errorMessage =
            'Failed to create user: ' + (error.error?.message || error.message);
          console.error('Error:', error);
        },
      });
    }
  }
}

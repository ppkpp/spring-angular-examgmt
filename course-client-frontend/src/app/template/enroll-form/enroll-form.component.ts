import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enroll-form',
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './enroll-form.component.html',
  styleUrl: './enroll-form.component.scss',
})
export class EnrollFormComponent {
  enrollmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,

    private router: Router
  ) {
    this.enrollmentForm = this.fb.group({
      imageUrl: ['', Validators.required],
      notes: ['', Validators.maxLength(500)],
    });
  }

  onSubmit(): void {
    if (this.enrollmentForm.valid) {
      // Handle the form submission (e.g., send data to the server)
      console.log('Form submitted', this.enrollmentForm.value);
    }
  }
}

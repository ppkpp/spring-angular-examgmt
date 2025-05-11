import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadComponent,
  ],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      imageUrl: [''],
    });
  }

  get fullImageUrl(): string | null {
    const imageUrl = this.registerForm.value.imageUrl;
    return imageUrl ? `${environment.apiUrl}/files${imageUrl}` : null;
  }

  removeImage() {
    this.registerForm.patchValue({ imageUrl: '' });
  }

  onFileUploaded(data: any) {
    const { webUrl } = data;
    if (webUrl) {
      this.registerForm.patchValue({ imageUrl: webUrl });
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Perform submit logic here (e.g. POST to your API)
      this.apiService
        .create('auth/register', this.registerForm.value)
        .subscribe({
          next: (res) => {
            alert('Registration successful!');
            this.registerForm.reset();
            this.imagePreview = null;
            this.router.navigate(['/login']);
          },
          error: (err) => {
            const msg = err.error?.message || 'Registration failed';
            alert(msg);
          },
        });
    }
  }
}

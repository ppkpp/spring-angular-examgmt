

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService } from '../../service/course.service';
import { ApiService } from '../../service/api.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
  imports: [
    RouterModule,
    CommonModule,
    FileUploadComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CurrencyPipe, DatePipe],
})
export class CourseDetailComponent implements OnInit {
  isEnrolled: boolean = false; // Track enrollment status
  course: any;
  courseId: number = 0;
  enrollForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe
  ) {
    const courseId = this.route.snapshot.paramMap.get('id');
    this.enrollForm = this.fb.group({
      notes: ['', Validators.required],
      imageUrl: [''],
      courseId: [courseId ? +courseId : null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.courseId = +id;
        this.getCourseById(this.courseId);
        this.checkEnrollmentStatus(this.courseId);
      }
    });
  }

  getCourseById(id: number): void {
    this.apiService.getById('courses', id).subscribe({
      next: (data) => {
        this.course = data;
      },
      error: (err) => {
        console.error('Error loading course:', err);
      },
    });
  }

  // Check if the student is already enrolled in the course
  checkEnrollmentStatus(courseId: number): void {
    this.courseService.checkEnrollment(courseId).subscribe({
      next: (response) => {
         if (response === 'Enrolled') {
           this.isEnrolled = true;
         } else if (response === 'Not Enrolled') {
           this.isEnrolled = false;
         } else {
           // Handle unexpected response
           this.isEnrolled = false;
         }
      },
      error: (err) => {
        console.error('Error checking enrollment status:', err);
        this.isEnrolled = false; // Default to not enrolled if error occurs
      },
    });
  }

  formatMoney(value: number) {
    return this.currencyPipe.transform(value, '', '', '1.0-0'); // e.g., "300,000"
  }

  getImageUrl(imagePath: string): string {
    return `${environment.apiUrl}/files${imagePath}`;
  }

  getCourseDate(createDate: string): string {
    return this.datePipe.transform(createDate, 'MMM dd, yyyy') || '';
  }
  goBack(): void {
    this.router.navigate(['../']); // This will navigate back to the previous page or list
  }

  onSubmit() {
    if (this.enrollForm.valid) {
      console.log(this.enrollForm.value);
      // Perform submit logic here (e.g. POST to your API)
      this.apiService.create('enrollments', this.enrollForm.value).subscribe({
        next: (res) => {
          alert('Registration successful!');
          this.enrollForm.reset();
          this.isModalOpen = false;
        },
        error: (err) => {
          const msg = err.error?.message || 'Registration failed';
          alert(msg);
        },
      });
    }
  }

  isModalOpen: boolean = false;

  // Method to open the modal
  openModal() {
    this.isModalOpen = true;
  }

  // Method to close the modal
  closeModal() {
    this.isModalOpen = false;
  }

  get fullImageUrl(): string | null {
    const imageUrl = this.enrollForm.value.imageUrl;
    return imageUrl ? `${environment.apiUrl}/files${imageUrl}` : null;
  }

  removeImage() {
    this.enrollForm.patchValue({ imageUrl: '' });
  }

  onFileUploaded(data: any) {
    const { webUrl } = data;
    if (webUrl) {
      this.enrollForm.patchValue({ imageUrl: webUrl });
    }
  }
}

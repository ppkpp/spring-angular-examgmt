import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../../service/category.service';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { environment } from '../../../environments/environment';
import { CourseService } from '../../service/course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadComponent,
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss',
})
export class AddCourseComponent implements OnInit {
  courseForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
  isEditMode = false;

  // List of categories fetched from the backend
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      instructorName: ['', Validators.required],
      categoryId: [null, Validators.required], // category select field
      imageUrl: ['', Validators.required], // image URL from file upload
      fees: ['', Validators.required],
      duration: ['', Validators.required],
      quizTime: [null, Validators.required],
    });

    // Fetch categories from the backend for category selection
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });

    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.isEditMode = true;
      this.loadCourse(+courseId);
    }
  }

  loadCourse(id: number): void {
    this.courseService.getCourseById(id).subscribe((data) => {
      this.courseForm.patchValue(data);
    });
  }

  get fullImageUrl(): string | null {
    const imageUrl = this.courseForm.value.imageUrl;
    return imageUrl ? `${environment.apiUrl}/files${imageUrl}` : null;
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      return;
    }

    const formValue = this.courseForm.value;
    const courseId = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && courseId) {
      this.courseService.updateCourse(+courseId, formValue).subscribe({
        next: () => {
          this.successMessage = 'Course updated successfully.';
          this.toastr.success('Course updated.', 'Elearning !');
          this.router.navigate(['/course-list']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Update failed.';
        },
      });
    } else {
      this.courseService.createCourse(formValue).subscribe({
        next: () => {
          this.successMessage = 'Course created successfully.';
           this.toastr.success('Course created.', 'Elearning !');
          this.router.navigate(['/course-list']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Creation failed.';
        },
      });
    }
  }

  // Remove image logic
  removeImage() {
    this.courseForm.patchValue({ imageUrl: '' });
  }

  onFileUploaded(data: any) {
    const { webUrl } = data;
    if (webUrl) {
      this.courseForm.patchValue({ imageUrl: webUrl });
    }
  }

  goBack(): void {
    this.router.navigate(['/course-list']);
  }
}

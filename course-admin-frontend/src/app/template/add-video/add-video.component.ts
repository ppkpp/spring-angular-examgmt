

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { VideoService } from '../../service/video.service';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { UploadedFileResponse } from '../../model/upload-response.model';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CourseService } from '../../service/course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrl: './add-video.component.scss',
  standalone: true,
  imports: [
    /* include CommonModule, ReactiveFormsModule, FileUploadComponent */
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadComponent,
    AutocompleteLibModule,
  ],
})
export class AddVideoComponent implements OnInit {
  videoCourseForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
  isEditMode = false;
  uploadedVideo: UploadedFileResponse = {
    originalFilename: '',
    savedFilename: '',
    path: '',
    webUrl: '',
    thumbnailUrl: '',
    fileType: '',
  };
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: VideoService,
    private courseService: CourseService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  data: Array<any> = [];
  keyword = 'title';
  ngOnInit(): void {
    this.videoCourseForm = this.fb.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      orderNumber: [1],
      courseId: [null, Validators.required],
      description: ['', Validators.required],
      duration: [null, Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadVideoCourse(+id);
    }
  }

  loadVideoCourse(id: number): void {
    this.service.getVideoCourseById(id).subscribe((data) => {
      this.videoCourseForm.patchValue({
        ...data,
        courseId: data.course.id,
      });
    });
  }

  get fullImageUrl(): string | null {
    const imageUrl = this.videoCourseForm.value.imageUrl;
    return imageUrl
      ? `${environment.apiUrl}/files${imageUrl}`.replace('.mp4', '_thumb.jpg')
      : null;
  }

  onSubmit(): void {
    if (this.videoCourseForm.invalid) return;

    const formValue = this.videoCourseForm.value;
    const id = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && id) {
      this.service.updateVideoCourse(+id, formValue).subscribe({
        next: () => {
          this.successMessage = 'Video course updated successfully.';
         this.toastr.success('Video course updated.', 'Category!');
          this.router.navigate(['/video-list']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Update failed.';
        },
      });
    } else {
      this.service.createVideoCourse(formValue).subscribe({
        next: () => {
          this.successMessage = 'Video course created successfully.';
          this.toastr.success('Video course created.', 'Category!');
          this.router.navigate(['/video-list']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Creation failed.';
        },
      });
    }
  }

  removeImage() {
    this.videoCourseForm.patchValue({ imageUrl: '' });
  }

  onFileUploaded(data: any) {
    this.uploadedVideo = data;
    const { webUrl, duration } = data;

    if (webUrl) {
      this.videoCourseForm.patchValue({ imageUrl: webUrl, duration: duration });
    }
  }

  selectEvent(item: any) {
    this.videoCourseForm.patchValue({
      courseId: item.id,
    });
  }

  // Method triggered when input changes
  onChangeSearch(val: string) {
    if (val && val.length > 1) {
      this.courseService.searchCoursesByName(val).subscribe(
        (res: any[]) => {
          console.log('Search Results:', res); // Debugging: Check fetched data
          this.data = res; // Update data array
        },
        (err) => {
          console.error('Search error:', err); // Log any errors
        }
      );
    }
  }

  // Method triggered when input is focused
  onFocused(e: any) {
    // Handle input focus if needed
  }

  goBack(): void {
    this.router.navigate(['/video-list']);
  }
}

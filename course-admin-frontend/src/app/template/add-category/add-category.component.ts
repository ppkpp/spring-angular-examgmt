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
import { FileUploadComponent } from "../../components/file-upload/file-upload.component";
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadComponent,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required], // this will hold response from file upload
    });

    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.isEditMode = true;
      this.loadCategory(+categoryId);
    }
  }

  loadCategory(id: number): void {
    this.categoryService.getCategoryById(id).subscribe((data) => {
      this.categoryForm.patchValue(data);
    });
  }
  get fullImageUrl(): string | null {
    const imageUrl = this.categoryForm.value.imageUrl;
    return imageUrl ? `${environment.apiUrl}/files${imageUrl}` : null;
  }
  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    const formValue = this.categoryForm.value;
    const categoryId = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && categoryId) {
      this.categoryService.updateCategory(+categoryId, formValue).subscribe({
        next: () => {
          this.successMessage = 'Category updated successfully.';
           this.toastr.success('Category updated.', 'Elearning !');
          this.router.navigate(['/category-list']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Update failed.';
        },
      });
    } else {
      this.categoryService.createCategory(formValue).subscribe({
        next: () => {
          this.successMessage = 'Category created successfully.';
          this.router.navigate(['/category-list']);
            this.toastr.success('Category created.', 'Elearning !');
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Creation failed.';
        },
      });
    }
  }
  // Remove image logic
  removeImage() {
    this.categoryForm.patchValue({ imageUrl: '' });
  }

  onFileUploaded(data: any) {
    const { webUrl } = data;
    if (webUrl) {
      this.categoryForm.patchValue({ imageUrl: webUrl });
    }
  }

  goBack():void {
    this.router.navigate(['/category-list']);
  }
}

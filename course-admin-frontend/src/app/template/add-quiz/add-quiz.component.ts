import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../service/quiz.service';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CourseService } from '../../service/course.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss'],
  standalone: true,
  imports: [
    /* include CommonModule, ReactiveFormsModule, FileUploadComponent */
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AutocompleteLibModule,
  ],
})
export class AddQuizComponent implements OnInit {
  quizForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
  isEditMode = false;

  data: Array<any> = [];
  keyword = 'title';
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private courseService: CourseService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      correctOption: [
        1,
        [Validators.required, Validators.min(1), Validators.max(4)],
      ],
      courseId: [null, Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadQuizData(+id);
    }
  }

  loadQuizData(id: number): void {
    // Assuming you have a service that fetches quiz data
    this.quizService.getQuizById(id).subscribe((data) => {
      this.quizForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.quizForm.invalid) return;

    const formValue = this.quizForm.value;
    const id = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && id) {
      this.quizService.updateQuiz(+id, formValue).subscribe({
        next: () => {
          this.successMessage = 'Quiz updated successfully.';
           this.toastr.success('Quiz updated.', 'Elearning !');
          this.router.navigate(['/quiz-list']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Update failed.';
        },
      });
    } else {
      this.quizService.createQuiz(formValue).subscribe({
        next: () => {
          this.successMessage = 'Quiz created successfully.';
          this.toastr.success('Quiz created.', 'Elearning !');
          this.router.navigate(['/quiz-list']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Creation failed.';
        },
      });
    }
  }

  selectEvent(item: any) {
    this.quizForm.patchValue({
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
  goBack():void {
    this.router.navigate(['/quiz-list']);
  }
}

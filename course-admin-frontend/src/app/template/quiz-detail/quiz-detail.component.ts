import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizService } from '../../service/quiz.service';
import { OptionService } from '../../service/option.service';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
})
export class QuizDetailComponent implements OnInit {
  quiz: any;
  isLoading = true;
  optionsForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private optionService: OptionService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchQuiz(+id);
    }
  }
  fetchQuiz(quizId: number): void {
    this.quizService.getQuizById(quizId).subscribe((data) => {
      this.quiz = data;
      this.isLoading = false;
      this.quiz.option.sort((a:any, b:any) => a.optionNumber - b.optionNumber);
      this.initForm();
    });
  }

  initForm() {
    this.optionsForm = this.fb.group({
      content: ['', Validators.required],
      optionNumber: [1, Validators.required],
      quizId: [this.quiz.id],
    });
  }

  addOption() {
    this.isLoading = true;
    if (this.optionsForm.valid) {
      this.optionService
        .createOption(this.optionsForm.value)
        .subscribe((res) => {
          this.fetchQuiz(this.quiz.id);

          this.optionsForm.reset({ optionNumber: 1, quizId: this.quiz.id });
        });
    }
  }
  deleteOption(optionId: number) {
    this.isLoading = true;
    if (confirm('Are you sure you want to delete this option?')) {
      this.optionService.deleteOption(optionId).subscribe(() => {
        this.fetchQuiz(this.quiz.id);
      });
    }
  }

  onEdit(quizId: number) {
    console.log('Edit user', quizId);
    this.router.navigate(['/add-quiz', quizId]);
    
    // Navigate to edit page or open modal with user info
  }

  onDelete(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.quizService.deleteQuiz(userId).subscribe(() => {
       this.router.navigate(['/quiz-list']);
      });
    }
  }
}

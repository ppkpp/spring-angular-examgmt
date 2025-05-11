import { QuizItemComponent } from '../../components/quiz-item/quiz-item.component';
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../service/quiz.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  timerMinutes: number = 0;
  timerSeconds: number = 0;
  examTime: number = 0; // in minutes
  private timerInterval: any;

  quizzes: any[] = []; // To store the list of users
  isLoading: boolean = true; // To show loading spinner

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  courseId: number | null = null;
  selectedAnswers: number | null = null; // Store selected answers for each step
  currentStep = 0;
  errorMsg: string | null = null;
  get steps(): any[] {
    return this.quizzes;
  }
  constructor(
    private quizService: QuizService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const courseIdParam = this.route.snapshot.paramMap.get('id');

    this.courseId = courseIdParam ? +courseIdParam : null;
    if (this.courseId !== null) {
      this.checkQuizAccess(this.courseId);
    }
  }

  checkQuizAccess(courseId: number): void {
    this.quizService.checkQuizAccess(courseId).subscribe({
      next: (response) => {
        if (response.status === 200) {
          console.log(response);
         this.examTime = response.body.examtime;
          this.startTimer(response.body.examtime);
          this.fetchQuizzes();
        }
      },
      error: (err) => {
        if (err.status === 409) {
          // TimesUp
          this.router.navigate(['/quiz-result', this.courseId]);
        } else if (err.status === 401) {
          this.router.navigate(['/login']);
        } else {
          alert('An unexpected error occurred');
        }
      },
    });
  }
  fetchQuizzes(): void {
    this.isLoading = true;
    this.quizService
      .getQuizzes(this.courseId !== null ? this.courseId : undefined)
      .subscribe({
        next: (data) => {
          this.quizzes = data;
          this.totalPages = data.totalPages;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching categories:', err);
          this.isLoading = false;
        },
      });
  }

  getSortedOptions(): any[] {
    if (
      Array.isArray(this.steps) &&
      this.steps.length > this.currentStep &&
      Array.isArray(this.steps[this.currentStep].option)
    ) {
      return [...this.steps[this.currentStep].option].sort(
        (a, b) => a.optionNumber - b.optionNumber
      );
    }
    return [];
  }
  isFinalStep(): boolean {
    return this.currentStep === this.steps.length - 1;
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchQuizzes();
  }

  goToStep(index: number): void {
    this.currentStep = index;
  }

  nextStep(quizId: number): void {
    const currentOptionId = this.selectedAnswers;
    const currentStep = this.steps[this.currentStep];

    if (currentOptionId) {
      const payload = {
        quizId: quizId,
        answerNumber: currentOptionId,
        courseId: this.route.snapshot.paramMap.get('id'), // typo fixed from couseId to courseId
        ...(this.isFinalStep() && { finalAnswer: true }), // Add isFinal only if it's the last step
      };
      1;

      this.apiService.create('exams/submit', payload).subscribe({
        next: (res) => {
          console.log(res); // Optionally display feedback
          if (this.isFinalStep()) {
            this.router.navigate(['/quiz-result', this.courseId]); // Replace with your desired route
          } else {
            this.currentStep++;
          }
        },
        error: (err) => {
          if (err.status === 409) {
            this.errorMsg = err.error;
            if (err.error === 'TimesUp') {
              this.router.navigate(['/quiz-result', this.courseId]); // Replace with your desired route
            }
            return;
          }

          console.error('Submission failed:', err);
        },
      });
    } else {
      alert('Please select an option before proceeding.');
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
  skipStep(): void {
    this.errorMsg = '';
    if (this.isFinalStep()) {
      this.router.navigate(['/quiz-result', this.courseId]); // Replace with your desired route
    } else {
      this.currentStep++;
    }
  }

  onOptionSelected(optionId: number): void {
    this.selectedAnswers = optionId;
  }

  startTimer(minutes: number): void {
    let totalSeconds = minutes * 60;
    this.updateTimerDisplay(totalSeconds);

    this.timerInterval = setInterval(() => {
      totalSeconds--;

      if (totalSeconds <= 0) {
        clearInterval(this.timerInterval);
        alert('Time is up!');
        this.router.navigate(['/quiz-result', this.courseId]);
      } else {
        
        this.updateTimerDisplay(totalSeconds);
      }
    }, 1000);
  }

  updateTimerDisplay(totalSeconds: number): void {
    this.timerMinutes = Math.floor(totalSeconds / 60);
    this.timerSeconds = totalSeconds % 60;
  }
  ngOnDestroy(): void {

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}

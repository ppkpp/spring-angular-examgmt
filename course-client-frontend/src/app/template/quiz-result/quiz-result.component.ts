import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from '../../service/answer.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-quiz-result',
  imports: [CommonModule],
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit {
  exams: any[] = []; // Store the answers list
  answers: any[] = [];
  isLoading: boolean = true; // Show loading spinner while fetching data
  courseId: number | null = null;

  constructor(
    private answerService: AnswerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Fetch courseId from the query parameter
    const courseIdParam = this.route.snapshot.paramMap.get('id');
    this.courseId = courseIdParam ? +courseIdParam : null;

    // Fetch answers based on the courseId
    this.fetchAnswers();
  }

  fetchAnswers(): void {
    if (this.courseId === null) {
      console.error('Course ID is missing.');
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.answerService.getAnswerByCourse(this.courseId).subscribe({
      next: (data) => {
        if (data && data.answer) {
          this.answers = data.answer; // Assign the answer array to exams
        }
        this.exams = data; // Directly assign the fetched data to answers
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching answers:', err);
        this.isLoading = false;
      },
    });
  }
}

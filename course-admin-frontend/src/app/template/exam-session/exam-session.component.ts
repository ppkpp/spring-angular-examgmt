import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../../service/exam.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-session',
  templateUrl: './exam-session.component.html',
  styleUrls: ['./exam-session.component.scss'],
  imports: [CommonModule],
})
export class ExamSessionComponent implements OnInit {
  studentId!: number;
  exams: any[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.studentId = +params['id'];
      this.loadExams();
    });
  }

  loadExams(): void {
    this.examService.getExamsByStudentId(this.studentId).subscribe({
      next: (data) => {
        this.exams = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading exams:', err);
        this.isLoading = false;
      },
    });
  }
  isModalOpen = false;
  answers: any = null;

  openModal(course: any): void {
 this.answers = course.answer;
 
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.answers = null;
  }
}

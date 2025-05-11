import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../service/quiz.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { CourseService } from '../../service/course.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CourseFilterComponent } from '../../components/course-filter/course-filter.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';
@Component({
  selector: 'app-quiz-list',
  imports: [CommonModule, PaginationComponent, CourseFilterComponent],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss',
})
export class QuizListComponent implements OnInit {
  quizzes: any[] = []; // To store the list of users
  isLoading: boolean = true; // To show loading spinner

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  courseId: number | null = null;

  constructor(
    private quizService: QuizService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private confirmService: ConfirmDialogService,
  ) {}

  ngOnInit(): void {
    const courseIdParam = this.route.snapshot.queryParamMap.get('courseId');
    this.courseId = courseIdParam ? +courseIdParam : null;
    this.fetchQuizzes();
  }

  // fetchQuizzes(): void {
  //   this.quizService.getQuizzes().subscribe({
  //     next: (data) => {
  //       this.quizzes = data; // Store the fetched data
  //       this.isLoading = false; // Hide loading spinner
  //     },
  //     error: (err) => {
  //       console.error('Error fetching users:', err);
  //       this.isLoading = false;
  //     },
  //   });
  // }
  fetchQuizzes(): void {
    this.isLoading = true;
    this.quizService
      .getPaginateQuizzes(
        this.currentPage,
        this.pageSize,
        this.courseId !== null ? this.courseId : undefined
      )
      .subscribe({
        next: (data) => {
          this.quizzes = data.content;
          this.totalPages = data.totalPages;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching categories:', err);
          this.isLoading = false;
        },
      });
  }
  changePage(page: number): void {
    this.currentPage = page;
    this.fetchQuizzes();
  }

  onDetail(quizId: number) {
    console.log('Edit user', quizId);
    this.router.navigate(['/quiz-detail', quizId]);
    // Navigate to edit page or open modal with user info
  }
  onEdit(quizId: number) {
    console.log('Edit user', quizId);
    this.router.navigate(['/add-quiz', quizId]);
    // Navigate to edit page or open modal with user info
  }

 async onDelete(userId: number) {  
    const confirmed = await this.confirmService.confirm(
    'Delete Confirmation',
    'Are you sure you want to delete this Quizz?'
  );
  if (confirmed) {
    this.quizService.deleteQuiz(userId).subscribe(() => {
      // this.quizzes = this.quizzes.filter((u) => u.id !== userId);
      this.toastr.success('Quiz removed.', 'Elearning !');
      this.fetchQuizzes();
    });
  }
  }

  onCourseSelected(courseId: number) {
    this.courseId = courseId;
    this.currentPage = 0; // Reset to first page on filter change
    this.fetchQuizzes();
  }
  onAddQuizz(): void {
    this.router.navigate(['/add-quiz']);
  }
}

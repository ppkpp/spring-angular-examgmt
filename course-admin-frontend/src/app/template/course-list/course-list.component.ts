import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CurrencyPipe } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';
@Component({
  standalone: true,
  selector: 'app-course-list',
  imports: [CommonModule, PaginationComponent, SearchBarComponent],
  providers: [CurrencyPipe],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  isLoading = true;

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private toastr: ToastrService,
    private confirmService: ConfirmDialogService,
  ) {}
  formatMoney(value: number) {
    return this.currencyPipe.transform(value, '', '', '1.0-0'); // e.g., "300,000"
  }
  ngOnInit(): void {
    this.fetchCourses();
  }

  // fetchCourses(): void {
  //   this.courseService.getCourses().subscribe({
  //     next: (data) => {
  //       this.courses = data;
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching courses:', err);
  //       this.isLoading = false;
  //     },
  //   });
  // }

  fetchCourses(): void {
    this.isLoading = true;
    this.courseService
      .getPaginateCourses(this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.courses = data.content;
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
    this.fetchCourses();
  }

  onEdit(courseId: number): void {
    this.router.navigate(['/add-course', courseId]);
  }

  goToQuizzs(courseId: number): void {
    this.router.navigate(['/quiz-list'], {
      queryParams: { courseId },
    });
  }

  goToVideoes(courseId: number): void {
    this.router.navigate(['/video-list'], {
      queryParams: { courseId },
    });
  }
  async onDelete(courseId: number) : Promise<void> {
      const confirmed = await this.confirmService.confirm(
        'Delete Confirmation',
        'Are you sure you want to delete this course?'
      );
    if (confirmed) {
      this.courseService.deleteCourse(courseId).subscribe(() => {
        //  this.courses = this.courses.filter((c) => c.id !== courseId);
        this.toastr.success('Course removed.', 'Elearning !');
        this.fetchCourses();
      });
    }
  }

  getImageUrl(imagePath: string): string {
    return `${environment.apiUrl}/files${imagePath}`;
  }
  onAddCourse(): void {
    this.router.navigate(['/add-course']);
  }
  searchTerm: string = '';

  onSearch(term: string): void {
    this.searchTerm = term;
    this.isLoading = true;
    this.courseService
      .getPaginateCourseWithFilter(
        this.currentPage,
        this.pageSize,
        this.searchTerm
      )
      .subscribe({
        next: (data) => {
          this.courses = data.content;
          this.totalPages = data.totalPages;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching categories:', err);
          this.isLoading = false;
        },
      });
  }
  onClear(): void {
    this.fetchCourses();
  }
}

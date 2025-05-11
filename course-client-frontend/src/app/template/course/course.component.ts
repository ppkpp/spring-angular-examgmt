import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ApiService } from '../../service/api.service';
import { CategoryItemComponent } from '../../components/category-item/category-item.component';
import { CourseItemComponent } from '../../components/course-item/course-item.component';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-category',
  imports: [CommonModule, PaginationComponent, CourseItemComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
  courses: any[] = [];
  isLoading = true;

  currentPage = 0;
  pageSize = 6;
  totalPages = 0;
  categoryId: number | null = null;
  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const courseIdParam = this.route.snapshot.queryParamMap.get('categoryId');
    this.categoryId = courseIdParam ? +courseIdParam : null;
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.isLoading = true;
    this.courseService
      .getPaginateWithFilter(
        this.currentPage,
        this.pageSize,
        this.categoryId !== null ? this.categoryId : undefined
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

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchCategories();
  }
}

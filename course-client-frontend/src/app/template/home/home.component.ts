import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { CategoryItemComponent } from '../../components/category-item/category-item.component';
import { CourseItemComponent } from '../../components/course-item/course-item.component';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule,BannerComponent, CategoryItemComponent, CourseItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  courses: any[] = [];
  categories: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadCategories();
  }

  loadCourses(): void {
    this.apiService.getPaginated('courses',0,3).subscribe((data) => {
      this.courses = data.content;
    });
  }

  loadCategories(): void {
    this.apiService.getPaginated('categories',0,3).subscribe((data) => {
      this.categories = data.content;
    });
  }
}

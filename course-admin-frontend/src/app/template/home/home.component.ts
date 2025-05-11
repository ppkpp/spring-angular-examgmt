import { Component, OnInit } from '@angular/core';
import { DashboardService, DashboardStats } from '../../service/dashboard.service';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from '../course-list/course-list.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule,CourseListComponent],
})
export class HomeComponent implements OnInit {
  stats: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getStats().subscribe((data: DashboardStats) => {
      this.stats = [
        {
          title: 'Students',
          count: data.totalStudents,
          icon: 'fas fa-user-graduate',
          color: '#0d6efd',
        },
        {
          title: 'Courses',
          count: data.totalCourses,
          icon: 'fas fa-book-open',
          color: '#198754',
        },
        {
          title: 'Quizzes',
          count: data.totalQuizzes,
          icon: 'fas fa-question-circle',
          color: '#ffc107',
        },
        {
          title: 'Videos',
          count: data.totalVideos,
          icon: 'fas fa-video',
          color: '#dc3545',
        },
      ];
    });
  }
}

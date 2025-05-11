import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { CourseItemComponent } from '../../../components/course-item/course-item.component';

@Component({
  selector: 'app-enrolled-courses',
  templateUrl: './enrolled-courses.component.html',
  styleUrls: ['./enrolled-courses.component.scss'],
  imports: [CommonModule,CourseItemComponent],
  standalone: true,
})
export class EnrolledCoursesComponent implements OnInit {
  enrolledCourses: any[] = [];
  isLoading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getAll('enrollments/my-courses').subscribe({
      next: (data) => {
        this.enrolledCourses = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching enrolled courses:', err);
        this.isLoading = false;
      },
    });
  }
 
}

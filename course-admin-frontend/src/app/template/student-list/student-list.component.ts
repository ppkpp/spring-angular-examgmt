import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { StudentService } from '../../service/student.service'; // adjust path if needed
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  isLoading: boolean = true;

  currentPage = 0;
  pageSize = 8;
  totalPages = 0;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.isLoading = true;
    this.studentService
      .getPaginatedStudents(this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.students = data.content;
          this.totalPages = data.totalPages;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching students:', err);
          this.isLoading = false;
        },
      });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchStudents();
  }

  onEdit(studentId: number) {
    console.log('Edit student', studentId);
    this.router.navigate(['/add-student', studentId]);
  }

  onDelete(studentId: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(studentId).subscribe(() => {
        this.fetchStudents();
      });
    }
  }
  getImageUrl(imagePath: string): string {
    return `${environment.apiUrl}/files${imagePath}`;
  }
  goToExams(studentId: number): void {
    this.router.navigate(['/exam-session', studentId]);
  }
}

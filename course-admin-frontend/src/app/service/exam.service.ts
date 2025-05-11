import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Adjust if path differs

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private apiUrl = `${environment.apiUrl}/examsessions`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Get exams by student ID
  getExamsByStudentId(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/${studentId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get exam details by ID
  getExamById(examId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${examId}`, {
      headers: this.getAuthHeaders(),
    });
  }
  // Get exam session by course and student ID
  getExamSessionByCourseAndStudent(
    courseId: number,
    studentId: number
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/course/${courseId}/student/${studentId}`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
}

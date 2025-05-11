
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = `${environment.apiUrl}/quizzes`; // Adjust API endpoint as needed

  constructor(private http: HttpClient) {}

  // Helper function to get Authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getQuizzes(courseId?: number): Observable<any> {
    let url = `${this.apiUrl}?`;

    // Append courseId if it exists
    if (courseId !== undefined && courseId !== null) {
      url += `&courseId=${courseId}`;
    }

    return this.http.get<any>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get a specific quiz by its ID
  getQuizById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Update an existing quiz
  updateQuiz(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  checkQuizAccess(courseId: number): Observable<any> {
    const url = `${this.apiUrl}/by-course/${courseId}`;
    return this.http.get(url, {
      headers: this.getAuthHeaders(),
      observe: 'response', // So we can inspect status code directly
    });
  }
}

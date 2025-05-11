import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Adjust the path if needed

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  // Method to get authentication headers with Bearer token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getPaginateCourses(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getPaginateCourseWithFilter(
    page: number,
    size: number,
    name: string
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}?page=${page}&size=${size}&name=${name}`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
  // Get all courses
  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Create a new course
  createCourse(courseData: any): Observable<any> {
    return this.http.post(this.apiUrl, courseData, {
      headers: this.getAuthHeaders(),
    });
  }

  // Delete a course by ID
  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Update an existing course by ID
  updateCourse(courseId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}`, updatedData, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get a course by ID
  getCourseById(courseId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${courseId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  searchCoursesByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/search/byTitle?name=${encodeURIComponent(name)}`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
}

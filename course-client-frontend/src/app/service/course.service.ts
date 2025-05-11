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

  searchCoursesByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/search/byTitle?name=${encodeURIComponent(name)}`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  getPaginateWithFilter(
    page: number,
    size: number,
    categoryId?: number
  ): Observable<any> {
    let url = `${this.apiUrl}?page=${page}&size=${size}`;

    // Append courseId if it exists
    if (categoryId !== undefined && categoryId !== null) {
      url += `&categoryId=${categoryId}`;
    }

    return this.http.get<any>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  checkEnrollment(courseId: number): Observable<string> {
    const url = `${environment.apiUrl}/enrollments/check?courseId=${courseId}`;
    return this.http.get<string>(url, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json', // Treat the response as text
    });
  }

  
}

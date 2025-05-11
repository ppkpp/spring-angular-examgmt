import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalVideos: number;
  totalQuizzes: number;
}


@Injectable({ providedIn: 'root' })
export class DashboardService {
   // Adjust if needed
  private apiUrl = `${environment.apiUrl}/dashboard`;
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }
}

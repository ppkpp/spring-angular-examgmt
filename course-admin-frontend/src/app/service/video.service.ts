import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private apiUrl = `${environment.apiUrl}/video-courses`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // getPaginateVideoCourses(page: number, size: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`, {
  //     headers: this.getAuthHeaders(),
  //   });
  // }

  getPaginateVideoCourses(
    page: number,
    size: number,
    courseId?: number
  ): Observable<any> {
    let url = `${this.apiUrl}?page=${page}&size=${size}`;

    // Append courseId if it exists
    if (courseId !== undefined && courseId !== null) {
      url += `&courseId=${courseId}`;
    }

    return this.http.get<any>(url, {
      headers: this.getAuthHeaders(),
    });
  }
  
  getVideoCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  createVideoCourse(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, {
      headers: this.getAuthHeaders(),
    });
  }

  getVideoCourseById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateVideoCourse(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteVideoCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

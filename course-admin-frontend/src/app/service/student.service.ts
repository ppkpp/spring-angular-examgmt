import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Adjust if path differs

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = `${environment.apiUrl}/students`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  getPaginatedStudents(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createStudent(studentData: any): Observable<any> {
    return this.http.post(this.apiUrl, studentData, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteStudent(studentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${studentId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateStudent(studentId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${studentId}`, updatedData, {
      headers: this.getAuthHeaders(),
    });
  }

  getStudentById(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${studentId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

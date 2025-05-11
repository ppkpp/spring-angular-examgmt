import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private apiUrl = `${environment.apiUrl}/exams`; // Adjust API endpoint as needed

  constructor(private http: HttpClient) {}

  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

 
  getAnswerByCourse(courseId: number): Observable<any> {
    const url = `${this.apiUrl}/course/${courseId}`;

    return this.http.get<any>(url, {
      headers: this.getAuthHeaders(),
    });
  }
}

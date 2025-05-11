import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Adjust as needed

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAll(endpoint: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getPaginated(endpoint: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${endpoint}?page=${page}&size=${size}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getById(endpoint: string, id: number | string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  create(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  update(endpoint: string, id: number | string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}/${id}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  delete(endpoint: string, id: number | string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/profile`, {
      headers: this.getAuthHeaders(),
    });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Adjust the path if needed

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
  getPaginateCategories(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getPaginateCategoriesWithFilter(page: number, size: number,name:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}&name=${name}`, {
      headers: this.getAuthHeaders(),
    });
  }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/find/all', {
      headers: this.getAuthHeaders(),
    });
  }

  createCategory(categoryData: any): Observable<any> {
    return this.http.post(this.apiUrl, categoryData, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${categoryId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateCategory(categoryId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${categoryId}`, updatedData, {
      headers: this.getAuthHeaders(),
    });
  }

  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${categoryId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

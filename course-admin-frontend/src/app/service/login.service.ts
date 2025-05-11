import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //private apiUrl = 'http://localhost:8080/api/auth/login'; // Your backend API
  private apiUrl = `${environment.apiUrl}/auth/login`;
  constructor(private http: HttpClient) {}

  // Login and store JWT token in localStorage
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password }).pipe(
      tap((res: any) => {
        // Store token in local storage
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        localStorage.setItem('role', res.role);
        localStorage.setItem('id', res.id);
      })
    );
  }

  // Logout and remove the token from localStorage
  /*logout() {
    localStorage.removeItem('token');
  }

  // Get JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get roles from the decoded JWT token
  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles || [];
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Check if user has a specific role
  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }*/
}

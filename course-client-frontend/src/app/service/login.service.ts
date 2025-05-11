import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'; // Adjust path if needed
@Injectable({ providedIn: 'root' })
export class AuthService {
  
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
}

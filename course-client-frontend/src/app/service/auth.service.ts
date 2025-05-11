import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserRole: string | null = null;

  constructor(private router: Router) {
    // Initialize the user's role (e.g., from a JWT token or API response)
    //this.currentUserRole = localStorage.getItem('role');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  hasRole(role: string): boolean {
    return localStorage.getItem('role') === role;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  // Additional methods for login, logout, etc.
}

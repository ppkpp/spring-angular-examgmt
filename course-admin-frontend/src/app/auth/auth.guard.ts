import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Get instances of AuthService and Router using inject() (in Angular 14+)
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is logged in
  if (authService.isLoggedIn()) {
    // If the route requires a specific role, check if the user has that role
    const requiredRole = route.data['role'] as string;
    if (requiredRole && !authService.hasRole(requiredRole)) {
      // If the user doesn't have the required role, redirect to the unauthorized page
      router.navigate(['/unauthorized']);
      return false;
    }
    return true;
  } else {
    // If not logged in, redirect to login page
    router.navigate(['/login']);
    return false;
  }
};

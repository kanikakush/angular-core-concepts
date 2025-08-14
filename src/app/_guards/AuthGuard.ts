// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole'); // e.g. 'admin'
  // Not logged in
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  // Role check example
  const allowedRoles = route.data?.['roles'] as string[]; // get from route
  if (allowedRoles && !allowedRoles.includes(userRole || '')) {
    router.navigate(['/unauthorized']);
    return false;
  }
  return true;
};

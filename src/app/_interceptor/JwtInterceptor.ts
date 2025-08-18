// jwt.interceptor.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CustomHttpResponse } from '../_interface/HttpErrorResponse';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // instead of constructor injection
  const token = localStorage.getItem('accessToken');

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((err: CustomHttpResponse) => {
      if (err.status === 401) {
        // Clear tokens from storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshUser');
        sessionStorage.clear();

        alert('Your session has expired. Please log in again.');
        router.navigate(['/login']);
      }

      if (err.status === 403) {
        alert('You are not authorized to perform this action.');
      }

      return throwError(() => err);
    })
  );
};

 // class based interceptor which is used in 
export class ClassJwtInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');

    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req).pipe(
      catchError((err: CustomHttpResponse) => {
        if (err.status === 401) {
          // Clear tokens from storage
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshUser');
          sessionStorage.clear();

          // Optional: Show message
          alert('Your session has expired. Please log in again.');

          // Redirect to login
          this.router.navigate(['/login']);
        }
        // Optional: Handle other errors globally
        if (err.status === 403) {
          alert('You are not authorized to perform this action.');
        }
        return throwError(() => err);
      })
    );
  }
}

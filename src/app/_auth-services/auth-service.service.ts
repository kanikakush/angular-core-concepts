import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginResponse } from '../_interface/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private apiUrl = 'https://localhost:7204/api'; // Replace with real API URL
  private accessToken = 'accessToken';
  private refreshUser = 'refreshUser';

  constructor(private http: HttpClient) {}

 register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }
  // Login to API and store JWT
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        map((response: LoginResponse) => {
           console.log(response);
          if (response?.accessToken) {
            window.sessionStorage.setItem(this.accessToken, response.accessToken)
            localStorage.setItem(this.accessToken, response.accessToken);

            window.sessionStorage.setItem(this.refreshUser, response.refreshUser)
            localStorage.setItem(this.refreshUser, response.refreshUser);
          }
          return response;
        })
      );
  }

  // Example: GET user profile from API
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/profile`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    });
  }
  // Logout and remove token
  logout(): void {
    localStorage.removeItem(this.accessToken);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.accessToken);
  }

  // Check if logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Decode JWT to get user role (without extra API call)
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  }



  // Utility: Check if token is expired
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // exp is in seconds
      return Date.now() > expiry;
    } catch {
      return true;
    }
  }
}

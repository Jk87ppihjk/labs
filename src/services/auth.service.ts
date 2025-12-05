import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { tap } from 'rxjs';

const USER_KEY = 'beatmarket_user';
const TOKEN_KEY = 'beatmarket_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // FIX: Explicitly type http property to resolve type inference issue.
  private http: HttpClient = inject(HttpClient);
  // FIX: Explicitly type router property for consistency and safety.
  private router: Router = inject(Router);
  private apiUrl = environment.apiUrl;

  currentUser = signal<any>(this.getUserFromStorage());

  private getUserFromStorage() {
    if (typeof window !== 'undefined') {
      const user = window.localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        if (response.accessToken) {
          window.localStorage.setItem(TOKEN_KEY, response.accessToken);
          window.localStorage.setItem(USER_KEY, JSON.stringify(response));
          this.currentUser.set(response);

          // Navigate based on role
          if (response.role === 'beatmaker') {
            this.router.navigate(['/beatmaker/dashboard']);
          } else {
            this.router.navigate(['/explore']);
          }
        }
      })
    );
  }

  logout() {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/welcome']);
  }
}

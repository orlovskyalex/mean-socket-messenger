import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenPayload, TokenResponse, UserDetails } from '../types';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private token: string;
  private baseUrl = '/auth';

  constructor(private http: HttpClient, private router: Router) {
  }

  register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem('mean-chat-token');
    this.router.navigateByUrl('/');
  }

  getUserDetails(): UserDetails {
    const token = this.getToken();

    if (token) {
      const payload = window.atob(token.split('.')[1]);
      return JSON.parse(payload);
    }

    return null;
  }

  isLoggedIn(): boolean {
    const user = this.getUserDetails();
    return user ? user.exp > Date.now() / 1000 : false;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-chat-token');
    }

    return this.token;
  }

  private saveToken(token: string): void {
    localStorage.setItem('mean-chat-token', token);
    this.token = token;
  }

  private request(
    method: 'post' | 'get',
    type: 'login' | 'register' | 'profile',
    user?: TokenPayload,
  ): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`${this.baseUrl}/${type}`, user);
    } else {
      base = this.http.get(
        `${this.baseUrl}/${type}`,
        { headers: { Authorization: `Bearer ${this.getToken()}` } },
      );
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }

        return data;
      }),
    );

    return request;
  }

}

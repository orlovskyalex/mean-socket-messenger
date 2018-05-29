import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TokenResponse } from '../token/token-response.interface';
import { TokenPayload } from '../token/token-payload.interface';

@Injectable()
export class AuthService {

  token$ = new BehaviorSubject<string>('');

  private baseUrl = '/auth';

  constructor(private http: HttpClient, private router: Router) {
  }

  init(): void {
    this.getToken();
  }

  getToken(): string {
    return this.token;
  }

  signUp(user: TokenPayload): Observable<any> {
    return this.request('sign-up', user);
  }

  login(user: TokenPayload): Observable<any> {
    return this.request('login', user);
  }

  signOut(): void {
    this.token = '';
    this.router.navigateByUrl('/auth');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  private get token(): string {
    if (!this.token$.getValue()) {
      this.token = localStorage.getItem('mean-chat-token');
    }

    return this.token$.getValue();
  }

  private set token(token) {
    if (token) {
      this.token$.next(token);
      localStorage.setItem('mean-chat-token', token);
    } else {
      this.token$.next('');
      localStorage.removeItem('mean-chat-token');
    }
  }

  private request(type: 'login' | 'sign-up', user?: TokenPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/${type}`, user)
      .pipe(
        map((data: TokenResponse) => {
          this.token = data.token;
          return data;
        }),
      );
  }

}

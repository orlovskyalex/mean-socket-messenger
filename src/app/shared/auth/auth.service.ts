import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TokenResponse } from '../token/token-response.interface';
import { TokenPayload } from '../token/token-payload.interface';
import { TokenInfo } from '../token/token-info.interface';

@Injectable()
export class AuthService {

  token$ = new BehaviorSubject<string>('');

  private baseUrl = '/auth';
  private timerId: number;

  constructor(private http: HttpClient, private router: Router) {
    this.getToken();
  }

  getToken(): string {
    return this.token;
  }

  signUp(user: TokenPayload): Observable<any> {
    return this.request('sign-up', user);
  }

  signIn(user: TokenPayload): Observable<any> {
    return this.request('sign-in', user);
  }

  signOut(): void {
    this.token = '';
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  getTokenInfo(token: string): TokenInfo {
    const payload = window.atob(token.split('.')[1]);
    return JSON.parse(payload);
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
      this.autoExpireToken(token);
    } else {
      this.token$.next('');
      localStorage.removeItem('mean-chat-token');
      //this.router.navigateByUrl('/auth');
    }
  }

  private request(type: 'sign-in' | 'sign-up', user?: TokenPayload): Observable<TokenResponse> {
    return this.http.post(`${this.baseUrl}/${type}`, user)
      .pipe(
        map((data: TokenResponse) => {
          this.token = data.token;
          return data;
        }),
      );
  }

  private autoExpireToken(token: string) {
    const { exp } = this.getTokenInfo(token);

    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    this.timerId = window.setTimeout(() => {
      this.token = '';
      this.timerId = null;
    }, exp * 1000 - Date.now());
  }

}

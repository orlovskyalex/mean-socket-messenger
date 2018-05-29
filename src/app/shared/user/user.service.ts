import { Injectable } from '@angular/core';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { TokenInfo } from '../token/token-info.interface';
import { UserResponse } from './user-response.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  user$ = new BehaviorSubject<User>(null);

  private baseUrl = '/user';

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  init(): void {
    this.watchToken();
  }

  getUser(userId: string): Observable<UserResponse> {
    return this.http.get(`${this.baseUrl}/${userId}`)
      .pipe(
        map((data: UserResponse) => {
          if (data.user) {
            this.user$.next(new User(data.user));
          } else {
            this.clearUser();
          }

          return data;
        }),
      );
  }

  private watchToken(): void {
    this.auth.token$.subscribe((token: string) => {
      this.parseAndSaveUser(token);
    });
  }

  private parseAndSaveUser(token?: string): void {
    if (token) {
      const payload = window.atob(token.split('.')[1]);
      const tokenInfo = JSON.parse(payload) as TokenInfo;

      this.getUser(tokenInfo.userId);
    } else {
      this.clearUser();
    }
  }

  private clearUser() {
    this.user$.next(null);
  }

}

import { Injectable } from '@angular/core';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { UserResponse } from './user-response.interface';
import { Observable } from 'rxjs/Observable';
import { UserListResponse } from './user-list-response.interface';
import 'rxjs/add/operator/map';
import { GetUserListParams } from './interfaces/get-user-list-params.interface';

@Injectable()
export class UserService {

  user$ = new BehaviorSubject<User>(null);

  private baseUrl = '/users';

  constructor(private http: HttpClient, private auth: AuthService) {
    this.watchToken();
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get(`${this.baseUrl}/${userId}`)
      .map(({ user }: UserResponse) => {
        return new User(user);
      });
  }

  getUserList(params: GetUserListParams, exceptCurrentUser = true): Observable<User[]> {
    const { name } = params;

    const httpParams = new HttpParams({
      fromObject: {
        name: name || '',
      },
    });

    return this.http.get(this.baseUrl, { params: httpParams })
      .map(({ users }: UserListResponse) => {
        if (exceptCurrentUser) {
          users = users.filter(user => user._id !== this.user._id);
        }

        return users.map(user => new User(user));
      });
  }

  private watchToken(): void {
    this.auth.token$.subscribe((token: string) => {
      this.parseUserFromToken(token);
    });
  }

  private parseUserFromToken(token: string): void {
    if (token) {
      const tokenInfo = this.auth.getTokenInfo(token);
      this.getUserById(tokenInfo.userId)
        .subscribe(user => {
          this.user = user;
        });
    } else {
      this.user = null;
    }
  }

  private get user(): User {
    return this.user$.getValue();
  }

  private set user(user: User | null) {
    this.user$.next(user);
  }

}

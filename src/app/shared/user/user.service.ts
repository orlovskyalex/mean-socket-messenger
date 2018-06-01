import { Injectable } from '@angular/core';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { UserResponse } from './user-response.interface';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { SocketService } from '../socket/socket.service';
import { UserListResponse } from './user-list-response.interface';

@Injectable()
export class UserService {

  user$ = new BehaviorSubject<User>(null);

  private baseUrl = '/user';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private socket: SocketService,
  ) {
    this.watchToken();
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get(`${this.baseUrl}/${userId}`)
      .pipe(
        map(({ user }: UserResponse) => {
          return new User(user);
        }),
      );
  }

  getUserList(exceptCurrentUser = true): Observable<User[]> {
    return this.http.get(this.baseUrl)
      .pipe(
        map(({ users }: UserListResponse) => {
          if (exceptCurrentUser) {
            users = users.filter(user => user._id !== this.user._id);
          }

          return users.map(user => new User(user));
        }),
      );
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

    if (user) {
      this.socket.connect(user._id);
    } else {
      this.socket.disconnect();
    }
  }

}

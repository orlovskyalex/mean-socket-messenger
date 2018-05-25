import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { API_URL } from '../../constants';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private auth: AuthService;

  constructor(private inj: Injector, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.auth = this.inj.get(AuthService);
    const token = this.auth.getToken();
    const url = (request.url.startsWith('http') || request.url.startsWith('/assets')) ? request.url
      : `${API_URL}${request.url}`;
    request = request.clone({
      url,
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(request).pipe(
      tap(null, (err: any) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', err.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong
          console.error(`Backend returned code ${err.status}, body was:`, err.error);
        }

        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 && token) {
            this.auth.logout();
            this.router.navigate(['/', 'auth', 'signin']);
          }
        }
      }),
    );
  }

}

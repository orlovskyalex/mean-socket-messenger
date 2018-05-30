import { Injectable } from '@angular/core';
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
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    let url;

    if (request.url.startsWith('http') || request.url.startsWith('/assets')) {
      url = request.url;
    } else {
      url = `${environment.API_URL}${request.url}`;
    }

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
            this.auth.signOut();
            this.router.navigateByUrl('/auth');
          }
        }
      }),
    );
  }

}

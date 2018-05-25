import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    console.log('auth');
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/auth');
      return false;
    }

    return true;
  }

}

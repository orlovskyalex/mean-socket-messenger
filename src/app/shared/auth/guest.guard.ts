import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class GuestGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    if (!this.auth.isLoggedIn) {
      return true;
    }

    this.router.navigateByUrl('/');
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

}

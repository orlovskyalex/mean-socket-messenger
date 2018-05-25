import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  currentUserId = '';

  auth() {
    this.currentUserId = Math.random().toString(36).substr(2, 9);
  }

}

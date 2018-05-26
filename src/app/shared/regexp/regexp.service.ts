import { Injectable } from '@angular/core';

@Injectable()
export class RegexpService {

  // e.g. "my.email@example.com"
  private emailRegExp = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;

  // at least one small letter, one big letter, one number, no whitespaces
  private passwordRegExp = /^(?!.*[\s])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{7,}$/;

  get email(): RegExp {
    return this.emailRegExp;
  }

  get password(): RegExp {
    return this.passwordRegExp;
  }

}

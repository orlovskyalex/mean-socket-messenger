import { Component } from '@angular/core';
import { RegexpService } from '../../shared/regexp/regexp.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { TokenPayload } from '../../shared/types';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  tokenPayload: TokenPayload = {
    email: null,
    password: null,
    name: {
      first: null,
      last: null,
    },
  };

  constructor(
    public regexp: RegexpService,
    private auth: AuthService,
  ) {
  }

  register(form: NgForm) {
    if (!(form.valid && this._formValid(form))) {
      return;
    }

    this.auth.register(this.tokenPayload)
      .toPromise()
      .then(() => {
        console.log('registered successfully');
        form.resetForm();
      })
      .catch(({ error }: HttpErrorResponse) => {
        for (const e of error) {
          console.error(`Register error: ${e.message}`);
        }
      });
  }

  private _formValid(form: NgForm): boolean {
    const email = form.value.email.trim();
    const password = form.value.password.trim();
    const firstName = form.value.firstName.trim();
    const lastName = form.value.lastName.trim();

    const emailValid = email.length && this.regexp.email.test(email);
    const passwordValid = password.length && this.regexp.password.test(password);
    const nameValid = firstName.length && lastName.length;

    return emailValid && passwordValid && nameValid;
  }

}

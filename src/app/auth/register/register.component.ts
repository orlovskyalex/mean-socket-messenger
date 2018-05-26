import { Component } from '@angular/core';
import { RegexpService } from '../../shared/regexp/regexp.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { TokenPayload } from '../../shared/types';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

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
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {
  }

  register(form: NgForm) {
    if (!(form.valid && this._formValid(form))) {
      return;
    }

    this.auth.register(this.tokenPayload)
      .toPromise()
      .then(() => {
        this.toastr.success(this.translate.instant('REGISTER.NOTIFICATION.SUCCESS'));
        form.resetForm();
      })
      .catch(({ error }: HttpErrorResponse) => {
        for (const e of error) {
          this.toastr.error(e.message);
        }
      });
  }

  private _formValid(form: NgForm): boolean {
    const email = form.value.email.trim();
    const password = form.value.password.trim();
    const firstName = form.value.firstName.trim();
    const lastName = form.value.lastName.trim();

    if (this.regexp.containsEmoji(email, password, firstName, lastName)) {
      this.toastr.warning(
        `🙅‍🤦‍ ${this.translate.instant('REGISTER.NOTIFICATION.NO_EMOJI')} 😡`,
        null,
        { toastClass: 'toast toast-warning toast-warning-emoji' },
      );
      return false;
    }

    const emailValid = email.length && this.regexp.email.test(email);
    const passwordValid = password.length && this.regexp.password.test(password);
    const nameValid = firstName.length && lastName.length;

    return emailValid && passwordValid && nameValid;
  }

}

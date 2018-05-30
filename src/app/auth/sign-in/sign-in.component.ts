import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormValidationService } from '../../shared/form-validation/form-validation.service';
import { AuthService } from '../../shared/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validate: FormValidationService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }

  signIn() {
    if (this.form.invalid) {
      return;
    }

    this.auth.signIn(this.form.value)
      .subscribe(
        () => {
          this.router.navigateByUrl('/');
        },
        ({ error }: HttpErrorResponse) => {
          for (const e of error) {
            this.toastr.error(e.message);
          }
        },
      );
  }

  private buildForm() {
    this.form = this.fb.group({
      email: [null, this.validate.email()],
      password: [null, this.validate.password()],
    });
  }

}

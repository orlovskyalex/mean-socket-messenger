import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from '../../shared/form-validation/form-validation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private validate: FormValidationService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }

  signUp() {
    if (this.form.invalid) {
      return;
    }

    this.auth.signUp(this.form.value)
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
      name: this.fb.group({
        first: [null, this.validate.userName()],
        last: [null, this.validate.userName()],
      }),
      email: [null, this.validate.email()],
      password: [null, this.validate.password()],
    });
  }

}

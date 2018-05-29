import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from '../../shared/form-validation/form-validation.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    private formValidation: FormValidationService,
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
      .toPromise()
      .then(() => this.resetForm())
      .catch(({ error }: HttpErrorResponse) => {
        for (const e of error) {
          this.toastr.error(e.message);
        }
      });
  }

  private buildForm() {
    this.form = this.fb.group({
      name: this.fb.group({
        first: [null, this.formValidation.userName()],
        last: [null, this.formValidation.userName()],
      }),
      email: [null, this.formValidation.email()],
      password: [null, this.formValidation.password()],
    });
  }

  private resetForm() {
    this.form.reset();
  }

}

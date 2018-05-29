import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from '../../shared/form-validation/form-validation.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

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

  register() {
    if (this.form.invalid) {
      return;
    }

    this.auth.register(this.form.value)
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

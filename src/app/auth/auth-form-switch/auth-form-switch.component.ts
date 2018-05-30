import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-form-switch',
  templateUrl: './auth-form-switch.component.html',
  styleUrls: ['./auth-form-switch.component.scss'],
})
export class AuthFormSwitchComponent {

  @Input() formType: 'SIGN_IN' | 'SIGN_UP';

  linksMap = {
    'SIGN_IN': 'sign-up',
    'SIGN_UP': 'sign-in',
  };

}

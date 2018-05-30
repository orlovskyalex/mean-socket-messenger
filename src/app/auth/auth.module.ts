import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthFormSwitchComponent } from './auth-form-switch/auth-form-switch.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [
    AuthComponent,
    SignUpComponent,
    SignInComponent,
    AuthFormSwitchComponent,
  ],
})
export class AuthModule {
}

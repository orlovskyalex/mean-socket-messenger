import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { MessageService } from './message/message.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { RegexService } from './regex/regex.service';
import { FormValidationService } from './form-validation/form-validation.service';
import { UserService } from './user/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { GuestGuard } from './auth/guest.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
  providers: [
    AuthService,
    MessageService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    FormValidationService,
    RegexService,
    UserService,
    GuestGuard,
  ],
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class SharedModule {
}

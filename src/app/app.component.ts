import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './shared/auth/auth.service';
import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private auth: AuthService,
    private user: UserService,
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

}

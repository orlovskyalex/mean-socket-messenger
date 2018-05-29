import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './shared/auth/auth.service';
import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private auth: AuthService,
    private user: UserService,
  ) {
  }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.auth.init();
    this.user.init();
  }

}

import { Component } from '@angular/core';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  user$ = this.userService.user$;

  constructor(private userService: UserService, private auth: AuthService) {
  }

  signOut() {
    this.auth.signOut();
  }

}

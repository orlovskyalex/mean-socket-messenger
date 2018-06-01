import { Component } from '@angular/core';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {

  users$ = this.user.getUserList();

  constructor(private user: UserService) {
  }

}

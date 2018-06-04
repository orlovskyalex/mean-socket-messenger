import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/user/user.model';
import { FormGroup } from '@angular/forms';
import { ChatService } from '../../shared/chat/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.scss'],
})
export class NewConversationComponent implements OnInit {

  users: User[];
  selectedRecipient: User;
  recipientId: string;

  constructor(
    private route: ActivatedRoute,
    private user: UserService,
    private chat: ChatService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.recipientId = this.route.snapshot.params.recipientId;

    this.user.getUserList()
      .subscribe(users => {
        this.users = users;

        if (this.recipientId) {
          this.selectedRecipient = users.find(user => user._id === this.recipientId);
        }
      });
  }

  searchUser() {
    return (text$: Observable<string>): Observable<User[]> => {
      return text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((query: string) => {
          if (query.length < 2) {
            return [];
          } else {
            // return first 10 results
            return this.users
              .filter(user => user.fullName.toLowerCase().includes(query.toLowerCase()))
              .slice(0, 10);
          }
        }),
      );
    };
  }

  userFormatter() {
    return (user: User): string => user.fullName;
  }

  selectRecipient(e: NgbTypeaheadSelectItemEvent) {
    const user = e.item as User;
    this.router.navigateByUrl(`/messages/new/${user._id}`);
  }

  createConversation(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    this.chat.createConversation(this.recipientId, form.value.message)
      .subscribe(conversationId => {
        form.reset();
        this.router.navigateByUrl(`/messages/${conversationId}`);
      });
  }

}

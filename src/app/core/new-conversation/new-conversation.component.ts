import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/user/user.model';
import { FormGroup } from '@angular/forms';
import { ChatService } from '../../shared/chat/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.scss'],
})
export class NewConversationComponent implements OnInit {

  selectedRecipient: User;
  recipientId: string;
  searching = false;
  searchFailed = false;

  constructor(
    private route: ActivatedRoute,
    private user: UserService,
    private chat: ChatService,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    this.recipientId = this.route.snapshot.params.recipientId;

    if (this.recipientId) {
      this.user.getUserById(this.recipientId)
        .toPromise()
        .then(user => {
          this.selectedRecipient = user;
        });
    }
  }

  searchUser() {
    return (text$: Observable<string>): Observable<User[]> => {
      return text$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.searching = true),
        switchMap((query: string) => {
            if (query.length < 2) {
              return of([]);
            }

            return this.user.getUserList({ name: query })
              .pipe(
                tap(() => this.searchFailed = false),
                catchError(() => {
                  this.searchFailed = true;
                  return of([]);
                }),
              );
          },
        ),
        tap(() => this.searching = false),
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

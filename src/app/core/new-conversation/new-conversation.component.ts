import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/user/user.model';
import { FormGroup } from '@angular/forms';
import { ChatService } from '../../shared/chat/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, switchMap, merge } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.scss'],
})
export class NewConversationComponent implements OnInit {

  selectedRecipient: User;
  recipientId: string;

  // TODO: add some feedback to user
  // searching = false;
  // searchFailed = false;

  private focus$ = new Subject<string>();

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
      const existingConversation = await this.chat.checkExistingConversation(this.recipientId).toPromise();

      if (existingConversation) {
        return this.router.navigateByUrl(`/messages/${existingConversation._id}`);
      }

      this.selectedRecipient = await this.user.getUserById(this.recipientId).toPromise();
    }
  }

  searchUser = (text$: Observable<string>): Observable<User[]> => {
    return text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      merge(this.focus$),
      // tap(() => this.searching = true),
      switchMap((query: string) => {
        return this.user.getUserList({ name: query })
          .pipe(
            // tap(() => this.searchFailed = false),
            catchError(() => {
              // this.searchFailed = true;
              return of([]);
            }),
          );
      }),
      // tap(() => this.searching = false),
    );
  };

  searchOnFocus(e): void {
    this.focus$.next(e.target.value);
  }

  userFormatter = (user: User): string => {
    return user.fullName;
  };

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

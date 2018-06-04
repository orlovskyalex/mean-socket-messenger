import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Message } from '../../shared/chat/interfaces/message.interface';
import { ChatService } from '../../shared/chat/chat.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {

  messages$ = this.chat.messages$;
  user$ = this.user.user$;

  private conversationId: string;

  constructor(
    private chat: ChatService,
    private route: ActivatedRoute,
    private user: UserService,
  ) {
  }

  ngOnInit() {
    this.conversationId = this.route.snapshot.params.conversationId;
    this.chat.enterConversation(this.conversationId);
  }

  ngOnDestroy() {
    this.chat.leaveConversation(this.conversationId);
  }

  getMessageClasses(message: Message, index: number): string {
    const classes = [];
    const messages = this.messages;

    const authorId = message.author._id;
    const isOwnMessage = this.isOwnMessage(message);

    const prevMessage = index === 0 ? null : messages[index - 1];
    const nextMessage = index < messages.length - 1 ? messages[index + 1] : null;

    if (prevMessage) {
      if (authorId !== prevMessage.author._id) { // if first message in group
        classes.push('msg-mt'); // add margin-top
      } else { // else
        classes.push(`msg-${isOwnMessage ? 'tr' : 'tl'}`); // remove top radius
      }
    }

    if (nextMessage) {
      if (authorId === nextMessage.author._id) { // if not last message in group
        classes.push(`msg-${isOwnMessage ? 'br' : 'bl'}`); // remove bottom radius
      }
    }

    return classes.join(' ');
  }

  isOwnMessage(message: Message): boolean {
    return message.author._id === this.userId;
  }

  sendMessage(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    this.chat.send(this.conversationId, form.value.message)
      .subscribe(() => {
        form.reset();
      });
  }

  private get userId(): string {
    const user = this.user$.getValue();
    return user ? user._id : null;
  }

  private get messages(): Message[] {
    return this.messages$.getValue();
  }

}

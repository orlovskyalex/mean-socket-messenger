import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageModel } from '../../shared/message/message.model';
import { MessageService } from '../../shared/message/message.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {

  messages$ = this.message.messages$;
  user$ = this.user.user$;
  newMessage = '';

  private recipientId: string;

  constructor(
    private message: MessageService,
    private route: ActivatedRoute,
    private user: UserService,
  ) {
  }

  ngOnInit() {
    this.recipientId = this.route.snapshot.params.recipientId;
    this.message.listenForMessagesFrom(this.recipientId);
  }

  ngOnDestroy() {
    this.message.clear();
  }

  get userId(): string {
    const user = this.user$.getValue();
    return user ? user._id : null;
  }

  get messages(): MessageModel[] {
    return this.messages$.getValue();
  }

  getMessageClasses(message: MessageModel, index: number): string {
    const classes = ['message'];

    const { recipientId } = message;
    const currentUserMessage = recipientId !== this.userId;

    const prevMessage = index === 0 ? null : this.messages[index - 1];
    const nextMessage = index < this.messages.length - 1 ? this.messages[index + 1] : null;

    if (currentUserMessage) {
      classes.push('msg-s');
    }

    if (prevMessage) {
      if (recipientId !== prevMessage.recipientId) { // if first message in group
        classes.push('msg-mt'); // add margin-top
      } else { // else
        classes.push(`msg-${currentUserMessage ? 'tr' : 'tl'}`); // remove top radius
      }
    }

    if (nextMessage) {
      if (recipientId === nextMessage.recipientId) { // if not last message in group
        classes.push(`msg-${currentUserMessage ? 'br' : 'bl'}`); // remove bottom radius
      }
    }

    return classes.join(' ');
  }

  sendMessage(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const message = new MessageModel({
      text: this.newMessage,
      recipientId: this.recipientId,
      senderId: this.userId,
    });

    this.message.sendMessage(message);
    this.newMessage = '';
    form.reset();
  }

}

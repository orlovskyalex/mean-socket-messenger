import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageModel } from '../../shared/message/message.model';
import { MessageService } from '../../shared/message/message.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
import { MessagePayload } from '../../shared/message/message-payload.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {

  form: FormGroup;
  messages$ = this.message.messages$;
  user$ = this.user.user$;

  private recipientId: string;

  constructor(
    private fb: FormBuilder,
    private message: MessageService,
    private route: ActivatedRoute,
    private user: UserService,
  ) {
  }

  ngOnInit() {
    this.recipientId = this.route.snapshot.params.recipientId;
    this.buildForm();
    this.message.getMessagesWith(this.recipientId);
  }

  ngOnDestroy() {
    this.message.clear();
  }

  getMessageClasses(message: MessageModel, index: number): string {
    const classes = [];
    const messages = this.messages;

    const recipientId = message.recipient._id;
    const isOwnMessage = this.isOwnMessage(message);

    const prevMessage = index === 0 ? null : messages[index - 1];
    const nextMessage = index < messages.length - 1 ? messages[index + 1] : null;

    if (prevMessage) {
      if (recipientId !== prevMessage.recipient._id) { // if first message in group
        classes.push('msg-mt'); // add margin-top
      } else { // else
        classes.push(`msg-${isOwnMessage ? 'tr' : 'tl'}`); // remove top radius
      }
    }

    if (nextMessage) {
      if (recipientId === nextMessage.recipient._id) { // if not last message in group
        classes.push(`msg-${isOwnMessage ? 'br' : 'bl'}`); // remove bottom radius
      }
    }

    return classes.join(' ');
  }

  isOwnMessage(message: MessageModel): boolean {
    return message.sender._id === this.userId;
  }

  sendMessage() {
    if (this.form.invalid) {
      return;
    }

    const message: MessagePayload = {
      message: this.form.value.message,
      recipient: this.recipientId,
      sender: this.userId,
    };

    this.message.send(message);
    this.resetForm();
  }

  private get userId(): string {
    const user = this.user$.getValue();
    return user ? user._id : null;
  }

  private get messages(): MessageModel[] {
    return this.messages$.getValue();
  }

  private buildForm() {
    this.form = this.fb.group({
      message: [null, Validators.required],
    });
  }

  private resetForm() {
    this.form.reset();
  }

}

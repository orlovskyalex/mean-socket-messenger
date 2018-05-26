import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageModel } from '../../shared/message/message.model';
import { AuthService } from '../../shared/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../shared/message/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  messages: MessageModel[];
  newMessage = '';
  currentUserId = '';

  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    //this.currentUserId = this.authService.currentUserId;

    this.subscription = this.messageService.messages$
      .subscribe(messages => {
        this.messages = messages;
      });
  }

  getMessageClasses(message: MessageModel, index: number): string {
    const classes = ['message'];

    const { senderId } = message;
    const currentUserMessage = senderId === this.currentUserId;

    const prevMessage = index === 0 ? null : this.messages[index - 1];
    const nextMessage = index < this.messages.length - 1 ? this.messages[index + 1] : null;

    if (currentUserMessage) {
      classes.push('msg-s');
    }

    if (prevMessage) {
      if (senderId !== prevMessage.senderId) { // if first message in group
        classes.push('msg-mt'); // add margin-top
      } else { // else
        classes.push(`msg-${currentUserMessage ? 'tr' : 'tl'}`); // remove top radius
      }
    }

    if (nextMessage) {
      if (senderId === nextMessage.senderId) { // if not last message in group
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
      senderId: this.currentUserId,
    });

    this.messageService.sendMessage(message);
    this.newMessage = '';
    form.reset();
  }

}

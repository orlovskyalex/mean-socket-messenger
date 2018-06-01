import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MessageModel } from './message.model';
import { Socket } from 'ng-socket-io';

@Injectable()
export class MessageService {

  messages$ = new BehaviorSubject<MessageModel[]>([]);

  constructor(private socket: Socket) {
  }

  listenForMessagesFrom(senderId: string) {
    this.socket.on('new message', message => {
      if (message.senderId === senderId) {
        this.pushNewMessage(message);
      }
    });
  }

  sendMessage(message: MessageModel) {
    this.socket.emit('new message', message);
    this.pushNewMessage(message);
  }

  clear() {
    this.messages = [];
  }

  private get messages(): MessageModel[] {
    return this.messages$.getValue();
  }

  private set messages(messages: MessageModel[]) {
    this.messages$.next(messages);
  }

  private pushNewMessage(message: MessageModel) {
    this.messages = [...this.messages, new MessageModel(message)];
  }

}

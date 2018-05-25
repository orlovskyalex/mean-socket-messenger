import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MessageModel } from './message.model';
import { Socket } from 'ng-socket-io';

@Injectable()
export class MessageService {

  messages$ = new BehaviorSubject<MessageModel[]>([]);

  constructor(private socket: Socket) {
    this.watchForNewMessages();
  }

  watchForNewMessages() {
    this.socket.on('message', message => {
      this.addNewMessage(message);
    });
  }

  sendMessage(message) {
    this.socket.emit('message', message);
    this.addNewMessage(message);
  }

  addNewMessage(message) {
    this.messages$.next([
      ...this.messages$.getValue(),
      new MessageModel(message),
    ]);
  }

}

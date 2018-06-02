import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MessageModel } from './message.model';
import { SocketService } from '../socket/socket.service';
import { MessagePayload } from './message-payload.interface';

@Injectable()
export class MessageService {

  messages$ = new BehaviorSubject<MessageModel[]>([]);

  constructor(private socket: SocketService) {
  }

  listenForMessagesFrom(userId: string) {
    this.socket.socket.on('new message', (message: MessageModel) => {
      if (message.sender._id === userId || message.recipient._id === userId) {
        this.pushNewMessage(message);
      }
    });
  }

  send(message: MessagePayload) {
    this.socket.socket.emit('new message', message);
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

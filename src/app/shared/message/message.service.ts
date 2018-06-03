import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MessageModel } from './message.model';
import { SocketService } from '../socket/socket.service';
import { MessagePayload } from './message-payload.interface';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { MessagesResponse } from './messages-response.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class MessageService {

  messages$ = new BehaviorSubject<MessageModel[]>([]);

  private baseUrl = '/messages';

  constructor(private socket: SocketService, private http: HttpClient) {
  }

  subscribe() {
    this.socket.socket.on('new message', this.pushNewMessage);
  }

  unsubscribe() {
    this.socket.socket.off('new message', this.pushNewMessage);
    this.clear();
  }

  getMessagesWith(userId: string) {
    this.http.get(`${this.baseUrl}/${userId}`)
      .pipe(
        map((response: MessagesResponse) => {
          return response.messages.map(message => new MessageModel(message));
        }),
      )
      .subscribe(messages => {
        this.messages = messages;
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

  private pushNewMessage = (message: MessageModel) => {
    this.messages = [...this.messages, new MessageModel(message)];
  };

}

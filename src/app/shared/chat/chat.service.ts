import { Injectable } from '@angular/core';
import { SocketService } from '../socket/socket.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Message } from './interfaces/message.interface';
import { NewConversationResponse } from './interfaces/new-conversation-response.interface';
import { Conversation } from './interfaces/conversation.interface';
import { ConversationResponse } from './interfaces/conversation-response.interface';
import { AllConversationsResponse } from './interfaces/all-conversations-response.interface';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Injectable()
export class ChatService {

  messages$ = new BehaviorSubject<Message[]>([]);

  private baseUrl = '/chat';

  constructor(
    private socket: SocketService,
    private http: HttpClient,
    private user: UserService,
  ) {
  }

  getAllConversations(): Observable<Conversation[]> {
    return this.http.get(this.baseUrl)
      .map(({ conversations }: AllConversationsResponse) => {
        // removing current user from a list of participants
        // and parsing a conversation title
        const userId = this.user.loggedUser$.getValue()._id;

        return conversations.map(conversation => {
          conversation.participants = conversation.participants
            .filter(participant => participant._id !== userId)
            .map(participant => new User(participant));

          conversation.title = conversation.participants
            .map(participant => participant.fullName)
            .join(',');

          return conversation;
        });
      });
  }

  getConversation(conversationId: string): void {
    this.http.get(`${this.baseUrl}/${conversationId}`)
      .subscribe(({ conversation }: ConversationResponse) => {
        this.messages$.next(conversation.messages);
      });
  }

  checkExistingConversation(recipientId: string): Observable<Conversation> {
    return this.http.get(`${this.baseUrl}/new/${recipientId}`)
      .map(({ conversation }: ConversationResponse) => conversation);
  }

  enterConversation(conversationId: string): void {
    this.socket.socket.emit('enter conversation', conversationId);
    this.socket.socket.on('refresh messages', this.refreshMessages);
    this.getConversation(conversationId);
  }

  leaveConversation(conversationId: string): void {
    this.socket.socket.emit('leave conversation', conversationId);
    this.socket.socket.off('refresh messages', this.refreshMessages);
  }

  send(conversationId: string, message: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${conversationId}`, { message })
      .do(() => {
        this.socket.socket.emit('new message', conversationId);
      });
  }

  createConversation(recipientId: string, message: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/new/${recipientId}`, { message })
      .map((response: NewConversationResponse) => response.conversationId);
  }

  private refreshMessages = (conversationId: string) => {
    this.getConversation(conversationId);
  };

}

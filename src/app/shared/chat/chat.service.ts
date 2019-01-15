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

  conversations$ = new BehaviorSubject<Conversation[]>([]);
  messages$ = new BehaviorSubject<Message[]>([]);

  private baseUrl = '/conversations';

  constructor(
    private socket: SocketService,
    private http: HttpClient,
    private user: UserService,
  ) {
    this.registerSocketListeners();
  }

  getConversationList(): void {
    this.http.get(this.baseUrl)
      .map(this.parseConversationsResponse)
      .do(this.joinConversations)
      .subscribe((conversations: Conversation[]) => {
        this.conversations$.next(conversations);
      });
  }

  getConversation(conversationId: string): void {
    this.http.get(`${this.baseUrl}/${conversationId}/messages`)
      .subscribe(({ conversation }: ConversationResponse) => {
        // this.messages$.next(conversation.messages);
      });
  }

  checkExistingConversation(recipientId: string): Observable<Conversation> {
    return this.http.get(`${this.baseUrl}/new/${recipientId}`)
      .map(({ conversation }: ConversationResponse) => conversation);
  }

  send(conversationId: string, message: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${conversationId}/messages`, { message });
  }

  createConversation(recipientId: string, message: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/new/${recipientId}`, { message })
      .map((response: NewConversationResponse) => response.conversationId);
  }

  private registerSocketListeners(): void {
    this.socket.socket.on('new message', this.onNewMessage);
    this.socket.socket.on('new conversation', this.onNewConversation);
  }

  private onNewMessage = (message: any): void => {
    console.log(message);
    // this.getConversation(conversationId);
  };

  private onNewConversation = (rawConversation: Conversation, message: Message): void => {
    const conversations = this.conversations$.getValue();
    const conversation = this.parseConversation(rawConversation, message);

    this.conversations$.next(conversations.concat(conversation));

    this.joinConversations([conversation]);
  };

  private joinConversations = (conversations: Conversation[]): void => {
    if (!conversations || !conversations.length) {
      return;
    }

    const conversationIds = conversations.map(conversation => conversation._id);
    this.socket.socket.emit('join', conversationIds);
  };

  private parseConversationsResponse = ({ conversations }: AllConversationsResponse): Conversation[] => {
    return conversations.map(conversation => this.parseConversation(conversation));
  };

  private parseConversation(conversation: Conversation, message?: Message): Conversation {
    const currentUser = this.user.loggedUser$.getValue();

    console.log(conversation);
    const participants = conversation.participants.map(participant => new User(participant));
    const title = participants
      .filter(participant => participant._id !== currentUser._id)
      .map(participant => participant.fullName)
      .join(', ');

    return {
      ...conversation,
      participants,
      title,
    };
  }

}

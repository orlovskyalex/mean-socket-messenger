import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../shared/chat/chat.service';
import { Observable } from 'rxjs/Observable';
import { Conversation } from '../../shared/chat/interfaces/conversation.interface';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss'],
})
export class ConversationListComponent implements OnInit {

  conversations$: Observable<Conversation[]>;

  constructor(private chat: ChatService) {
  }

  ngOnInit() {
    this.conversations$ = this.chat.getAllConversations();
  }

}

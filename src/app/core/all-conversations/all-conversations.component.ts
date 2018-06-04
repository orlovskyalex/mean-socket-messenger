import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../shared/chat/chat.service';
import { Observable } from 'rxjs/Observable';
import { Conversation } from '../../shared/chat/interfaces/conversation.interface';

@Component({
  selector: 'app-all-conversations',
  templateUrl: './all-conversations.component.html',
  styleUrls: ['./all-conversations.component.scss'],
})
export class AllConversationsComponent implements OnInit {

  conversations$: Observable<Conversation[]>;

  constructor(private chat: ChatService) {
  }

  ngOnInit() {
    this.conversations$ = this.chat.getAllConversations();
  }

}

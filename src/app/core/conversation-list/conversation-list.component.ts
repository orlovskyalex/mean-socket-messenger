import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../shared/chat/chat.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss'],
})
export class ConversationListComponent implements OnInit {

  conversations$ = this.chat.conversations$;

  constructor(private chat: ChatService) {
  }

  ngOnInit() {
    this.chat.getConversationList();
  }

}

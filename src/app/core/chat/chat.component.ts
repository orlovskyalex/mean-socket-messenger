import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../shared/chat/interfaces/message.interface';
import { ChatService } from '../../shared/chat/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input() recipientId: string;

  messages$ = this.chat.messages$;
  user$ = this.user.loggedUser$;
  form: FormGroup;

  private conversationId: string;

  constructor(
    private fb: FormBuilder,
    private chat: ChatService,
    private route: ActivatedRoute,
    private router: Router,
    private user: UserService,
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.conversationId = this.route.snapshot.params.conversationId;
    this.enterConversation();
  }

  ngOnDestroy() {
    this.leaveConversation();
  }

  enterConversation() {
    if (this.conversationId) {
      this.chat.enterConversation(this.conversationId);
    }
  }

  leaveConversation() {
    if (this.conversationId) {
      this.chat.leaveConversation(this.conversationId);
    }
  }

  getMessageClasses(message: Message, index: number): string {
    const classes = [];
    const messages = this.messages;

    const authorId = message.author._id;
    const isOwnMessage = this.isOwnMessage(message);

    const prevMessage = index === 0 ? null : messages[index - 1];
    const nextMessage = index < messages.length - 1 ? messages[index + 1] : null;

    if (prevMessage) {
      if (authorId !== prevMessage.author._id) { // if first message in group
        classes.push('msg-mt'); // add margin-top
      } else { // else
        classes.push(`msg-${isOwnMessage ? 'tr' : 'tl'}`); // remove top radius
      }
    }

    if (nextMessage) {
      if (authorId === nextMessage.author._id) { // if not last message in group
        classes.push(`msg-${isOwnMessage ? 'br' : 'bl'}`); // remove bottom radius
      }
    }

    return classes.join(' ');
  }

  isOwnMessage(message: Message): boolean {
    return message.author._id === this.userId;
  }

  submit() {
    this.recipientId ? this.createConversation() : this.sendMessage();
  }

  async sendMessage() {
    if (this.form.invalid) {
      return;
    }

    await this.chat.send(this.conversationId, this.form.value.message).toPromise();

    this.form.reset();
  }

  async createConversation() {
    if (this.form.invalid) {
      return;
    }

    const { message } = this.form.value;
    const conversationId = await this.chat.createConversation(this.recipientId, message).toPromise();

    this.form.reset();
    this.router.navigateByUrl(`/messages/${conversationId}`);
  }

  private buildForm() {
    this.form = this.fb.group({
      message: [null, Validators.required],
    });
  }

  private get userId(): string {
    const user = this.user$.getValue();
    return user ? user._id : null;
  }

  private get messages(): Message[] {
    return this.messages$.getValue();
  }

}

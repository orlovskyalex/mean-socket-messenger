import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { ChatComponent } from './chat/chat.component';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { NewConversationComponent } from './new-conversation/new-conversation.component';
import { AllConversationsComponent } from './all-conversations/all-conversations.component';
import { ChatFormComponent } from './chat/chat-form/chat-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    SharedModule,
    NgbModule,
  ],
  declarations: [
    CoreComponent,
    ChatComponent,
    NewConversationComponent,
    AllConversationsComponent,
    ChatFormComponent,
  ],
})
export class CoreModule {
}

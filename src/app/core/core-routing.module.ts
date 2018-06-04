import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from '../shared/auth/auth.guard';
import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';
import { NewConversationComponent } from './new-conversation/new-conversation.component';
import { AllConversationsComponent } from './all-conversations/all-conversations.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AllConversationsComponent,
        pathMatch: 'full',
      },
      {
        path: 'new',
        component: NewConversationComponent,
      },
      {
        path: 'new/:recipientId',
        component: NewConversationComponent,
      },
      {
        path: ':conversationId',
        component: ChatComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {
}

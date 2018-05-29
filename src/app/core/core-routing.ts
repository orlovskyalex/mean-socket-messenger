import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from '../shared/auth/auth.guard';

export const coreRoutes: Routes = [
  {
    path: '',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

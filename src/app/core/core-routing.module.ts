import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from '../shared/auth/auth.guard';
import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':recipientId',
        component: ChatComponent,
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

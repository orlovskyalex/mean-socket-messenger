import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { MessageService } from './message/message.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    AuthService,
    MessageService,
  ],
})
export class SharedModule {
}

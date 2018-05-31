import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { ChatComponent } from './chat/chat.component';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    TranslateModule,
  ],
  declarations: [
    CoreComponent,
    ChatComponent,
  ],
})
export class CoreModule {
}

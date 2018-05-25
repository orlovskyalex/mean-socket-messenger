import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './core/components/chat/chat.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const socketConfig: SocketIoConfig = { url: 'https://47c9a360.ngrok.io/' };

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(socketConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

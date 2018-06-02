import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

// import { Socket } from 'ng-socket-io';

@Injectable()
export class SocketService {

  private _socket: Socket;

  constructor(private auth: AuthService) {
    this.watchToken();
  }

  get socket(): Socket {
    return this._socket;
  }

  disconnect() {
    if (this.socket) {
      this._socket.disconnect();
      this._socket = null;
    }
  }

  private watchToken() {
    this.auth.token$.subscribe((token: string) => {
      this.create(token);
    });
  }

  private create(token: string) {
    if (token) {
      this._socket = io(environment.SOCKET_URL, {
        query: {
          token,
        },
      });
    } else {
      this.disconnect();
    }
  }

}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import Socket = SocketIOClient.Socket;

@Injectable()
export class SocketService {

  private _socket: Socket;

  constructor(private auth: AuthService) {
    this.watchToken();
  }

  get socket(): Socket {
    return this._socket;
  }

  private watchToken(): void {
    this.auth.token$.subscribe((token: string) => {
      if (token) {
        const userId = this.auth.getTokenInfo(token).userId;
        this.connect(userId);
      } else {
        this.disconnect();
      }
    });
  }

  private connect(userId: string): void {
    this._socket = io(environment.SOCKET_URL);
    this._socket.emit('join', userId);
  }

  private disconnect(): void {
    if (this.socket) {
      this._socket.disconnect();
      this._socket = null;
    }
  }

}

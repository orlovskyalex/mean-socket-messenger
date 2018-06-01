import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class SocketService {

  constructor(private socket: Socket) {
  }

  connect(userId: string) {
    this.socket.emit('join room', userId);
  }

  disconnect(close = true) {
    this.socket.disconnect(close);
  }

}

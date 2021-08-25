import { Inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { SOCKET_URL } from '@modules/socket';
import { Observable, ReplaySubject } from 'rxjs';

export interface Message {
  from: string;
  to: string;
  content: string;
}

@Injectable()
export class SocketService {
  private socket: Socket;
  private incomingMessages: ReplaySubject<Message> = new ReplaySubject(10);

  constructor(@Inject(SOCKET_URL) private url: string) {
    this.socket = io(url);

    this.socket.on('new-message', (message: Message) => {
      this.incomingMessages.next(message);
      console.log('message', message);
    });
  }

  public sendMessage(message: Message): void {
    this.socket.emit('send-message', message);
  }

  public registerName(name: string): void {
    this.socket.emit('register-name', name);
  }

  public getIncomingMessages(): Observable<Message> {
    return this.incomingMessages.asObservable();
  }
}

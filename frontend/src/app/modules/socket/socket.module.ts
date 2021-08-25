import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from './socket.service';

export const SOCKET_URL = new InjectionToken<string>('SocketUrl');

@NgModule({
  imports: [CommonModule],
  providers: [SocketService],
})
export class SocketModule {
  static forRoot(url: string) {
    return {
      ngModule: SocketModule,
      providers: [
        {
          provide: SOCKET_URL,
          useValue: url,
        },
      ],
    };
  }
}

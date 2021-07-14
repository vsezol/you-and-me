import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import Peer from 'peerjs';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  private peer: Peer;

  incomingСall$: Subject<any> = new Subject<any>();

  peerId$: Subject<string> = new Subject<string>();

  constructor() {

    this.peer = new Peer({
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
        ],
      },
    });

    this.peer.on('open', (peerId: string) => this.peerId$.next(peerId));

    this.peer.on('call', (connection: any) => {
      console.log(connection);
      this.incomingСall$.next(connection);
    });
  }

  call(peerId: string, mediaStream: MediaStream): Promise<MediaStream> {
    return new Promise<MediaStream>((resolve) => {
      const call = this.peer.call(peerId, mediaStream);

      call.on('stream', (stream: any) => {
        resolve(stream);
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import * as PeerObject from 'peerjs';
//@ts-ignore
const peerObject: {
  peerjs: {
    Peer: {
      new (): PeerObject;
    };
  };
} = PeerObject;
const Peer = peerObject.peerjs.Peer;

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  private peer: PeerObject;

  incomingСall$: Subject<any> = new Subject<any>();

  peerId$: Subject<string> = new Subject<string>();

  constructor() {
    this.peer = new Peer();

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

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import Peer, { MediaConnection } from 'peerjs';

interface MediaConnectionWithRemoteStream extends MediaConnection {
  remoteStream: MediaStream;
}

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  private peer: Peer;

  public incomingСall$: Subject<MediaConnectionWithRemoteStream> =
    new Subject<MediaConnectionWithRemoteStream>();

  public peerId = '';

  constructor() {
    this.peer = new Peer({
      config: {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      },
    });

    this.peer.on('open', (peerId: string) => {
      this.peerId = peerId;
    });

    this.peer.on('call', (connection: any) => {
      this.incomingСall$.next(connection);
    });

    this.peer.on('error', (error: Error) => {
      console.log('[ERROR] in peer', error);
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

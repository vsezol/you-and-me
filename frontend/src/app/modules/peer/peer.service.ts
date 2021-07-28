import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

import Peer, { MediaConnection } from 'peerjs';

interface MediaConnectionWithRemoteStream extends MediaConnection {
  remoteStream: MediaStream;
}

@Injectable()
export class PeerService {
  private peer: Peer;

  public incomingCall$: Subject<MediaConnectionWithRemoteStream> =
    new Subject<MediaConnectionWithRemoteStream>();

  public peerId$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
    this.peer = new Peer({
      config: {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      },
    });

    this.peer.on('open', (peerId: string) => {
      this.peerId$.next(peerId);
    });

    this.peer.on('call', (connection: any) => {
      this.incomingCall$.next(connection);
    });

    this.peer.on('error', (error: Error) => {
      console.log('[ERROR] in peer', error);
    });
  }

  call(
    peerId: string,
    mediaStream: MediaStream,
    metadata: any = {}
  ): Promise<MediaStream> {
    return new Promise<MediaStream>((resolve) => {
      const call = this.peer.call(peerId, mediaStream, {
        metadata,
      });

      call.on('stream', (stream: any) => {
        resolve(stream);
      });
    });
  }
}

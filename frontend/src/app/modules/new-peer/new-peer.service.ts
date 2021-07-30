import { Injectable } from '@angular/core';
import Peer, { MediaConnection } from 'peerjs';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

import { ICE_SERVERS } from './contants';
import { MediaService } from '../media/media.service';

interface CallMetadata {
  caller: {
    name: string;
  };
}

@Injectable()
export class NewPeerService {
  public localStream$: ReplaySubject<MediaStream> =
    new ReplaySubject<MediaStream>(1);

  public remoteStream$: ReplaySubject<MediaStream> =
    new ReplaySubject<MediaStream>(1);

  public incomingCall$: Subject<CallMetadata> = new Subject<CallMetadata>();

  private peer: Peer;

  private localPeerId = '';

  private remoteConnection$!: BehaviorSubject<MediaConnection>;

  constructor(private mediaService: MediaService) {
    this.peer = new Peer({
      config: {
        iceServers: ICE_SERVERS,
      },
    });

    this.peer.on('open', (peerId: string) => {
      this.localPeerId = peerId;
    });

    this.peer.on('call', (connection: MediaConnection) => {
      if (!this.remoteConnection$) {
        this.remoteConnection$ = new BehaviorSubject(connection);
      } else {
        this.remoteConnection$.next(connection);
      }

      this.incomingCall$.next(connection.metadata);
    });
  }

  public async answer(): Promise<void> {
    try {
      await this.createLocalStream();
      await this.waitForRemoteStream();
    } catch (error) {
      console.log('Error in answer', error);
    }
  }

  public async call(peerId: string): Promise<void> {
    try {
      const localStream = await this.createLocalStream();

      const connection = this.peer.call(peerId, localStream);
      this.remoteConnection$.next(connection);

      await this.waitForRemoteStream();
    } catch (error) {
      console.log('Error in call', error);
    }
  }

  private async createLocalStream(): Promise<MediaStream> {
    try {
      const localStream = await this.mediaService.createUserMediaStream();
      this.localStream$.next(localStream);

      return localStream;
    } catch (error) {
      console.log('Error in creating local stream');
      throw error;
    }
  }

  private async waitForRemoteStream(): Promise<void> {
    const connection = this.remoteConnection$.getValue();

    return await new Promise<void>((resolve, reject) => {
      connection.on('stream', (remoteStream: MediaStream) => {
        this.remoteStream$.next(remoteStream);

        resolve();
      });

      connection.on('close', () => {
        console.log('Connection closed');

        reject(new Error('Connection closed'));
      });
    });
  }
}

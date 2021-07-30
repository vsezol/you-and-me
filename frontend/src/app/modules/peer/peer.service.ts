import { Injectable } from '@angular/core';
import Peer, { MediaConnection } from 'peerjs';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

import { ICE_SERVERS } from './contants';
import { MediaService } from './media.service';
import { LoggerService } from '../logger/logger.service';

interface CallMetadata {
  caller: {
    name: string;
  };
}

@Injectable()
export class PeerService {
  public localStream$: ReplaySubject<MediaStream> =
    new ReplaySubject<MediaStream>(1);

  public remoteStream$: ReplaySubject<MediaStream> =
    new ReplaySubject<MediaStream>(1);

  public incomingCall$: Subject<CallMetadata> = new Subject<CallMetadata>();

  public localPeerId$: Subject<string> = new Subject<string>();

  private peer: Peer;

  private remoteConnection$!: BehaviorSubject<MediaConnection>;

  constructor(
    private mediaService: MediaService,
    private loggerService: LoggerService
  ) {
    this.peer = new Peer({
      config: {
        iceServers: ICE_SERVERS,
      },
    });

    this.peer.on('open', (peerId: string) => {
      this.localPeerId$.next(peerId);
    });

    this.peer.on('call', (connection: MediaConnection) => {
      this.setRemoteConnection(connection);
      this.incomingCall$.next(connection.metadata);
    });
  }

  public async answer(): Promise<void> {
    try {
      const localStream = await this.createLocalStream();

      const connection = this.remoteConnection$.getValue();
      connection.answer(localStream);

      await this.waitForRemoteStream();
    } catch (error) {
      this.loggerService.error('NewPeer')('Error in answer', error);
    }
  }

  public async call(peerId: string, metadata: CallMetadata): Promise<void> {
    try {
      const localStream = await this.createLocalStream();

      const connection = this.peer.call(peerId, localStream, {
        metadata,
      });
      this.setRemoteConnection(connection);

      await this.waitForRemoteStream();
    } catch (error) {
      this.loggerService.error('NewPeer')('Error in call', error);
    }
  }

  public decline(): void {
    const connection = this.remoteConnection$.getValue();
    connection.close();
  }

  private async createLocalStream(): Promise<MediaStream> {
    try {
      const localStream = await this.mediaService.createUserMediaStream();
      this.localStream$.next(localStream);

      return localStream;
    } catch (error) {
      this.loggerService.error('NewPeer')('Error in creating local stream');
      throw error;
    }
  }

  private async waitForRemoteStream(): Promise<void> {
    const connection = this.remoteConnection$.getValue();

    return await new Promise<void>((resolve, reject) => {
      connection.on('stream', (remoteStream: MediaStream) => {
        this.loggerService.log('NewPeer')('Connection accepted!');

        this.remoteStream$.next(remoteStream);

        resolve();
      });

      connection.on('close', () => {
        const error = new Error('Connection closed');

        this.loggerService.error('NewPeer')(error.message);

        reject(error);
      });
    });
  }

  private setRemoteConnection(connection: MediaConnection) {
    if (!this.remoteConnection$) {
      this.remoteConnection$ = new BehaviorSubject(connection);
    } else {
      this.remoteConnection$.next(connection);
    }
  }
}

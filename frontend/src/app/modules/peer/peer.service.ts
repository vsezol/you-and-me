import { Injectable } from '@angular/core';
import Peer, { MediaConnection } from 'peerjs';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

import { ICE_SERVERS } from './contants';
import { MediaConfig, MediaService } from './media.service';
import { LoggerService } from '../logger/logger.service';

interface CallMetadata {
  caller: {
    name: string;
  };
}

interface CallProps {
  peerId: string;
  metadata?: CallMetadata;
  mediaConfig?: MediaConfig;
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

  public mediaConnection$!: BehaviorSubject<MediaConnection>;

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
      this.setMediaConnection(connection);
      this.incomingCall$.next(connection.metadata);
    });
  }

  public async answer(mediaConfig?: MediaConfig): Promise<void> {
    try {
      const localStream = await this.createLocalStream(mediaConfig);

      const connection = this.mediaConnection$.getValue();
      connection.answer(localStream);

      await this.waitForRemoteStream();
    } catch (error) {
      this.loggerService.error('Peer')('Error in answer', error);
    }
  }

  public async call({
    peerId,
    metadata,
    mediaConfig,
  }: CallProps): Promise<void> {
    try {
      const localStream = await this.createLocalStream(mediaConfig);

      const mediaConnection = this.peer.call(peerId, localStream, {
        metadata,
      });

      this.setMediaConnection(mediaConnection);

      await this.waitForRemoteStream();
    } catch (error) {
      this.loggerService.error('Peer')('Error in call', error);
    }
  }

  public decline(): void {
    const connection = this.mediaConnection$.getValue();
    connection.close();
    this.loggerService.info('PeerService')('Connection closed');
  }

  private async createLocalStream(
    mediaConfig?: MediaConfig
  ): Promise<MediaStream> {
    try {
      const localStream = await this.mediaService.createUserMediaStream(
        mediaConfig
      );
      this.localStream$.next(localStream);

      return localStream;
    } catch (error) {
      this.loggerService.error('Peer')('Error in creating local stream');
      throw error;
    }
  }

  private async waitForRemoteStream(): Promise<void> {
    const connection = this.mediaConnection$.getValue();

    const remoteStream = await new Promise<MediaStream>((resolve, reject) => {
      connection.on('stream', (stream: MediaStream) => {
        this.loggerService.log('Peer')('Connection accepted!');

        resolve(stream);
      });

      connection.on('close', () => {
        const error = new Error('Connection closed');
        this.loggerService.error('Peer')(error.message);

        reject(error);
      });
    });

    this.remoteStream$.next(remoteStream);
  }

  private setMediaConnection(connection: MediaConnection) {
    if (!this.mediaConnection$) {
      this.mediaConnection$ = new BehaviorSubject(connection);
    } else {
      this.mediaConnection$.next(connection);
    }
  }
}

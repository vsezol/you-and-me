import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MediaService } from '../services/media.service';
import { PeerService } from '../../peer/peer.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  stream$: BehaviorSubject<MediaStream> = new BehaviorSubject<
    MediaStream | any
  >(null);

  remoteStream$: BehaviorSubject<MediaStream> = new BehaviorSubject<
    MediaStream | any
  >(null);

  remotePeerId = '';

  constructor(
    public peerService: PeerService,
    private mediaService: MediaService
  ) {}

  ngOnInit(): void {
    this.mediaService.createUserMediaStream().then((stream) => {
      this.stream$.next(stream);
    });

    this.peerService.incomingCall$.subscribe((mediaConnection) => {
      const isAccept = window.confirm('Incoming Call');

      if (!isAccept) return;

      mediaConnection.answer(this.stream$.getValue());
      this.takeCall(mediaConnection);
    });
  }

  makeCall(): void {
    this.peerService
      .call(this.remotePeerId, this.stream$.getValue())
      .then((stream) => this.takeCall({ remoteStream: stream }));
  }

  takeCall(connection: { remoteStream: MediaStream }): void {
    setTimeout(() => {
      if (!!connection?.remoteStream) {
        this.remoteStream$.next(connection.remoteStream);
      } else {
        this.takeCall(connection);
      }
    }, 100);
  }
}

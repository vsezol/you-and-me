import { AfterViewInit, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PeerService } from './peer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  stream$: BehaviorSubject<MediaStream> = new BehaviorSubject<
    MediaStream | any
  >(null);

  remoteStream$: BehaviorSubject<MediaStream> = new BehaviorSubject<
    MediaStream | any
  >(null);

  remotePeerId = '';

  constructor(public peerService: PeerService) {}

  ngAfterViewInit(): void {
    this.createUserMediaStream().then((stream) => {
      this.stream$.next(stream);
    });

    this.peerService.incomingСall$.subscribe((mediaConnection) => {
      const isAccept = window.confirm('Incoming Call');

      if (!isAccept) return;

      mediaConnection.answer(this.stream$.getValue());

      setTimeout(() => {
        this.remoteStream$.next(mediaConnection.remoteStream);
      }, 1500);
    });
  }

  async createUserMediaStream(): Promise<MediaStream> {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return mediaStream;
  }

  call() {
    this.peerService
      .call(this.remotePeerId, this.stream$.getValue())
      .then((stream) => this.remoteStream$.next(stream));
  }
}

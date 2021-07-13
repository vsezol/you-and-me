import { AfterViewInit, ElementRef, Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('video') video!: ElementRef;

  stream$: Subject<MediaStream> = new Subject<MediaStream>();

  ngAfterViewInit(): void {
    this.createUserMediaStream().then((stream) => this.stream$.next(stream));
  }

  async createUserMediaStream(): Promise<MediaStream> {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return mediaStream;
  }
}

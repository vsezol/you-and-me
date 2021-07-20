import { Injectable } from '@angular/core';

@Injectable()
export class MediaService {
  constructor() {}

  async createUserMediaStream(): Promise<MediaStream> {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return mediaStream;
  }
}

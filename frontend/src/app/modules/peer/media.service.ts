import { Injectable } from '@angular/core';

export interface MediaConfig {
  video: boolean;
  audio: boolean;
}

@Injectable()
export class MediaService {
  constructor() {}

  async createUserMediaStream({
    video = true,
    audio = true,
  }: Partial<MediaConfig> = {}): Promise<MediaStream> {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video,
      audio,
    });

    return mediaStream;
  }
}

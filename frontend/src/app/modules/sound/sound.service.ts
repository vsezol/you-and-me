import { Inject, Injectable } from '@angular/core';
import { SOUND_ASSETS_PATH } from '@modules/sound/sound.module';

@Injectable()
export class SoundService {
  constructor(@Inject(SOUND_ASSETS_PATH) private path: string) {}

  async play(soundName: string, looped = false) {
    const sound = new Audio(`${this.path}/${soundName}.mp3`);

    await new Promise<void>((resolve) => {
      sound.addEventListener('loadeddata', () => {
        sound.play();
        resolve();
      });
    });

    if (looped) {
      sound.addEventListener('ended', () => {
        sound.play();
      });
    }

    return this.stopSound.bind(this, sound);
  }

  private stopSound(sound: HTMLAudioElement): void {
    sound?.removeAllListeners!();
    sound.pause();
    sound.remove();
  }
}

import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundService } from '@modules/sound/sound.service';

export const SOUND_ASSETS_PATH = new InjectionToken<string>('SoundAssetsPath');

@NgModule({
  imports: [CommonModule],
  providers: [SoundService],
})
export class SoundModule {
  static forPath(soundAssetsPath: string) {
    return {
      ngModule: SoundModule,
      providers: [
        {
          provide: SOUND_ASSETS_PATH,
          useValue: soundAssetsPath,
        },
      ],
    };
  }
}

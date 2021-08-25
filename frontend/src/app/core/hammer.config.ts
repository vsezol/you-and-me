import { Injectable, Provider } from '@angular/core';
import {
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig,
} from '@angular/platform-browser';

import Hammer from 'hammerjs';

@Injectable()
class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

export const HAMMER_CONFIG_PROVIDER: Provider = {
  provide: HAMMER_GESTURE_CONFIG,
  useClass: HammerConfig,
};

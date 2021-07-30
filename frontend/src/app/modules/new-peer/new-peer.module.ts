import { NgModule } from '@angular/core';

import { NewPeerService } from './new-peer.service';
import { LoggerModule } from '../logger/logger.module';

@NgModule({
  declarations: [],
  imports: [LoggerModule],
  providers: [NewPeerService],
})
export class NewPeerModule {}

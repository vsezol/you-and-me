import { NgModule } from '@angular/core';

import { PeerService } from './peer.service';
import { LoggerModule } from '../logger/logger.module';
import { PeerIdService } from './peer-id.service';
import { MediaService } from './media.service';

@NgModule({
  declarations: [],
  imports: [LoggerModule],
  providers: [PeerService, PeerIdService, MediaService],
})
export class PeerModule {}

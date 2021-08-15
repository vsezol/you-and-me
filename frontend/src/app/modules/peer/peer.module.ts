import { NgModule } from '@angular/core';

import { LoggerModule } from '@modules';

import { PeerService } from './peer.service';
import { PeerIdService } from './peer-id.service';
import { MediaService } from './media.service';

@NgModule({
  imports: [LoggerModule],
  providers: [PeerService, PeerIdService, MediaService],
})
export class PeerModule {}

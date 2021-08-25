import { NgModule } from '@angular/core';


import { PeerService } from './peer.service';
import { PeerIdService } from './peer-id.service';
import { MediaService } from './media.service';
import { LoggerModule } from '@modules/logger';

@NgModule({
  imports: [LoggerModule],
  providers: [PeerService, PeerIdService, MediaService],
})
export class PeerModule {}

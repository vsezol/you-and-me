import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeerService } from './peer.service';
import { PeerIdService } from './peer-id.service';

@NgModule({
  imports: [CommonModule],
  providers: [PeerService, PeerIdService],
})
export class PeerModule {}

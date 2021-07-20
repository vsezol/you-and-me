import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeerService } from './services/peer.service';

@NgModule({
  imports: [CommonModule],
  providers: [PeerService],
})
export class PeerModule {}

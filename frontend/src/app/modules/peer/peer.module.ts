import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeerService } from './peer.service';

@NgModule({
  imports: [CommonModule],
  providers: [PeerService],
})
export class PeerModule {}

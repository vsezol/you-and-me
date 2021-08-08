import { Component } from '@angular/core';
import { PeerService } from '../../peer/peer.service';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.scss'],
})
export class VideoChatComponent {
  constructor(public peerService: PeerService) {}
}

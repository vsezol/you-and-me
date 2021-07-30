import { Component } from '@angular/core';
import { PeerService } from '../../peer/peer.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent {
  constructor(public peerService: PeerService) {}
}

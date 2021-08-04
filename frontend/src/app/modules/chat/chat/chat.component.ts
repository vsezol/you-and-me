import { Component } from '@angular/core';
import { PeerService } from '../../peer/peer.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  constructor(public peerService: PeerService) {}
}

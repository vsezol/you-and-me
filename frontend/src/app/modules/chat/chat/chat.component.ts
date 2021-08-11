import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/core/services/toolbar.service';
import { PeerIdService } from '../../peer/peer-id.service';
import { PeerService } from '../../peer/peer.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(
    private toolbarService: ToolbarService,
    private peerIdService: PeerIdService,
    private peerService: PeerService
  ) {}

  ngOnInit(): void {
    this.toolbarService.setActions([
      {
        icon: 'videocam',
        name: 'videoCall',
      },
      {
        icon: 'call',
        name: 'voiceCall',
      },
    ]);
  }

  ngOnDestroy(): void {
    this.toolbarService.clearActions();
  }
}

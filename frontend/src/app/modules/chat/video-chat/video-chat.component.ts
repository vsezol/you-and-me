import { Component } from '@angular/core';
import { PeerService } from '../../peer/peer.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.scss'],
})
export class VideoChatComponent {
  constructor(
    public peerService: PeerService,
    private dialogRef: MatDialogRef<VideoChatComponent>
  ) {}

  endCall(): void {
    this.peerService.decline();
    this.dialogRef.close();
  }
}

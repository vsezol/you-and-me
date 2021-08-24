import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PeerService } from '@modules/peer';

@Component({
  selector: 'app-chat-modal-inner',
  templateUrl: './chat-modal-inner.component.html',
  styleUrls: ['./chat-modal-inner.component.scss'],
})
export class ChatModalInnerComponent {
  constructor(
    public peerService: PeerService,
    private dialogRef: MatDialogRef<ChatModalInnerComponent>
  ) {}

  endCall(): void {
    this.peerService.decline();
    this.dialogRef.close();
  }
}

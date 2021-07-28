import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PeerService } from '../peer/peer.service';
import { CallAlertComponent } from './call-alert/call-alert.component';

@Injectable({
  providedIn: 'root',
})
export class CallAlertService {
  constructor(private dialog: MatDialog, private peerService: PeerService) {
    this.peerService.incomingCall$.subscribe(() => {
      this.dialog.open(CallAlertComponent, {
        width: '250px',
        data: {
          username: 'jopa',
        },
      });
    });
  }
}

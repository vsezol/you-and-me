import { Directive } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PeerService } from '../peer/peer.service';
import { CallAlertComponent } from './call-alert/call-alert.component';

@Directive({
  selector: 'app-call-alert-dialog',
})
export class CallAlertDialogDirective {
  constructor(private dialog: MatDialog, private peerService: PeerService) {
    this.peerService.incomingCall$.subscribe((connection) => {
      console.log('c', connection);
      const dialogRef = this.dialog.open(CallAlertComponent, {
        width: '250px',
        data: {
          username: connection.metadata.username,
        },
      });

      dialogRef.afterClosed().subscribe((isAccepted) => {
        if (isAccepted) {
          console.log('call accepted');
        } else {
          console.log('call declined');
        }

        console.log('remoteStream', connection.remoteStream);
      });
    });
  }
}

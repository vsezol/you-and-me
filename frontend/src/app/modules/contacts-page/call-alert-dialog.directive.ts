import { Directive } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CallAlertComponent } from './call-alert/call-alert.component';
import { NewPeerService } from '../new-peer/new-peer.service';

@Directive({
  selector: 'app-call-alert-dialog',
})
export class CallAlertDialogDirective {
  constructor(
    private dialog: MatDialog,
    private newPeerService: NewPeerService
  ) {
    this.newPeerService.incomingCall$.subscribe((metadata) => {
      const callerName = metadata.caller.name;

      console.log('incoming call from', callerName);

      const dialogRef = this.dialog.open(CallAlertComponent, {
        width: '250px',
        data: {
          username: callerName,
        },
      });

      dialogRef.afterClosed().subscribe(async (isAccepted) => {
        if (isAccepted) {
          console.log('call accepted');
          await this.newPeerService.answer();
        } else {
          console.log('call declined');
          await this.newPeerService.decline();
        }
      });
    });
  }
}

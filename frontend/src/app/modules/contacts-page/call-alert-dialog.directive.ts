import { Directive } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CallAlertComponent } from './call-alert/call-alert.component';
import { LoggerService } from '../logger/logger.service';
import { Router } from '@angular/router';
import { PeerService } from '../peer/peer.service';

@Directive({
  selector: 'app-call-alert-dialog',
})
export class CallAlertDialogDirective {
  constructor(
    private dialog: MatDialog,
    private peerService: PeerService,
    private loggerService: LoggerService,
    private router: Router
  ) {
    this.peerService.incomingCall$.subscribe((metadata) => {
      const callerName = metadata.caller.name;

      loggerService.info('ContactsPage')('Incoming call from', callerName);

      const dialogRef = this.dialog.open(CallAlertComponent, {
        width: '250px',
        data: {
          username: callerName,
        },
      });

      dialogRef.afterClosed().subscribe(async (isAccepted) => {
        if (isAccepted) {
          loggerService.log('ContactsPage')('Call accepted');
          await this.peerService.answer();

          this.router.navigate(['chat']);
        } else {
          loggerService.log('ContactsPage')('Call declined');
          await this.peerService.decline();
        }
      });
    });
  }
}

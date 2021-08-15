import { Directive, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CallAlertComponent } from './call-alert/call-alert.component';
import { LoggerService, PeerService } from '@modules';

@Directive({
  selector: 'app-call-alert-dialog',
})
export class CallAlertDialogDirective implements OnDestroy {
  destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private peerService: PeerService,
    private loggerService: LoggerService
  ) {
    this.peerService.incomingCall$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((metadata) => {
        console.count();
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
          } else {
            loggerService.log('ContactsPage')('Call declined');
            await this.peerService.decline();
          }
        });
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

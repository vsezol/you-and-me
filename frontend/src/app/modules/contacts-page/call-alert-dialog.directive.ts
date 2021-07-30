import { Directive, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CallAlertComponent } from './call-alert/call-alert.component';
import { LoggerService } from '../logger/logger.service';
import { Router } from '@angular/router';
import { PeerService } from '../peer/peer.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'app-call-alert-dialog',
})
export class CallAlertDialogDirective implements OnDestroy {
  destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private peerService: PeerService,
    private loggerService: LoggerService,
    private router: Router
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

            this.router.navigate(['chat']);
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

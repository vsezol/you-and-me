import { Directive } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PeerService } from '@modules/peer';
import { ChatModalInnerComponent } from './chat-modal-inner/chat-modal-inner.component';

@Directive({
  selector: 'app-chat-modal',
})
export class ChatModalDirective {
  private destroyed$: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog, private peerService: PeerService) {
    this.peerService.remoteStream$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        const dialogRef = this.dialog.open(ChatModalInnerComponent, {
          width: '100%',
          minWidth: '100%',
          height: '100vh',
          maxHeight: '100vh',
        });

        dialogRef
          .afterClosed()
          .pipe(takeUntil(this.destroyed$))
          .subscribe(() => {
            this.peerService.decline();
          });
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

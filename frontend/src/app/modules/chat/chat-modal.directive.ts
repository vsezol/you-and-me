import { Directive } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PeerService } from '../peer/peer.service';
import { takeUntil } from 'rxjs/operators';
import { VideoChatComponent } from './video-chat/video-chat.component';

@Directive({
  selector: 'app-chat-modal',
})
export class ChatModalDirective {
  private destroyed$: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog, private peerService: PeerService) {
    this.peerService.remoteStream$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((remoteStream) => {
        const dialogRef = this.dialog.open(VideoChatComponent, {
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

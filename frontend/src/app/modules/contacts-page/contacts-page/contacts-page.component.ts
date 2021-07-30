import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UsersService } from '../../users/users.service';
import { ServerUser, User } from '../../../common';
import { PeerIdService } from '../../peer/peer-id.service';
import { PeerService } from '../../peer/peer.service';
import { MediaService } from '../../media/media.service';
import { NewPeerService } from '../../new-peer/new-peer.service';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
})
export class ContactsPageComponent implements OnInit, OnDestroy {
  constructor(
    private usersService: UsersService,
    private peerIdService: PeerIdService,
    private newPeerService: NewPeerService,
    // private peerService: PeerService,
    private mediaService: MediaService
  ) {}

  destroyed$: Subject<void> = new Subject();

  currentUser!: User;

  users!: ServerUser[];

  ngOnInit(): void {
    this.usersService
      .getCurrentUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        this.currentUser = user;
      });

    this.usersService
      .getUsers({ withOutCurrent: true })
      .pipe(takeUntil(this.destroyed$))
      .subscribe((users) => {
        this.users = users;
      });

    this.newPeerService.localPeerId$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((peerId) => {
        if (!peerId) return;

        this.peerIdService.addCurrentUserPeerId(peerId).subscribe(() => {
          this.logUserPeerId(this.currentUser.username, peerId);
        });
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onCall(username: string) {
    this.peerIdService
      .getPeerIdByUsername(username)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(async (peerId) => {
        this.logUserPeerId(username, peerId);

        await this.newPeerService.call(peerId, {
          caller: { name: this.currentUser.username },
        });
      });
  }

  private logUserPeerId(username: string, peerId: string) {
    console.log(`user ${username} has peerId ${peerId}`);
  }
}

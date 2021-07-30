import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UsersService } from '../../users/users.service';
import { ServerUser, User } from '../../../common';
import { LoggerService } from '../../logger/logger.service';
import { Router } from '@angular/router';
import { PeerService } from '../../peer/peer.service';
import { PeerIdService } from '../../peer/peer-id.service';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
})
export class ContactsPageComponent implements OnInit, OnDestroy {
  constructor(
    private usersService: UsersService,
    private peerIdService: PeerIdService,
    private peerService: PeerService,
    private loggerService: LoggerService,
    private router: Router
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

    this.peerService.localPeerId$
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

        await this.peerService.call(peerId, {
          caller: { name: this.currentUser.username },
        });

        this.router.navigate(['chat']);
      });
  }

  private logUserPeerId(username: string, peerId: string) {
    this.loggerService.log('ContactsPage')(
      `user ${username} has peerId ${peerId}`
    );
  }
}

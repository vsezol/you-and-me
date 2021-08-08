import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { UsersService } from '../../users/users.service';
import { ServerUser } from '../../../common';
import { LoggerService } from '../../logger/logger.service';
import { PeerService } from '../../peer/peer.service';
import { PeerIdService } from '../../peer/peer-id.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private destroyed$: Subject<void> = new Subject();

  private currentUser!: ServerUser;

  public users!: ServerUser[];

  public activeChatName!: Observable<string>;

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

    this.activeChatName = this.route.firstChild?.params.pipe(
      takeUntil(this.destroyed$),
      map((params) => params.username)
    )!;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public openChat(user: ServerUser): void {
    this.router.navigate(['/contacts', user.username]);
  }

  public onCall(username: string) {
    this.peerIdService
      .getPeerIdByUsername(username)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(async (peerId) => {
        this.logUserPeerId(username, peerId);

        await this.peerService.call(peerId, {
          caller: { name: this.currentUser.username },
        });
      });
  }

  private logUserPeerId(username: string, peerId: string) {
    this.loggerService.log('ContactsPage')(
      `user ${username} has peerId ${peerId}`
    );
  }
}

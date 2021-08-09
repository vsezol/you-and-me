import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { UsersService } from '../../users/users.service';
import { ServerUser } from '../../../common';
import { LoggerService } from '../../logger/logger.service';
import { PeerService } from '../../peer/peer.service';
import { PeerIdService } from '../../peer/peer-id.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToolbarService } from '../../../core/services/toolbar.service';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
})
export class ContactsPageComponent implements OnInit, OnDestroy {
  public users!: ServerUser[];

  public activeChatName!: string;

  private destroyed$: Subject<void> = new Subject();

  private currentUser!: ServerUser;

  public withChat = false;

  constructor(
    private usersService: UsersService,
    private peerIdService: PeerIdService,
    private peerService: PeerService,
    private loggerService: LoggerService,
    private router: Router,
    private route: ActivatedRoute,
    private toolbarService: ToolbarService
  ) {
    this.subscribeToUrlChanged();
  }

  ngOnInit(): void {
    this.fetchCurrentUser();
    this.fetchUsers();

    this.subscribeToLocalPeerIdChanged();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.toolbarService.clearLabel();
  }

  public openChat(user: ServerUser): void {
    this.toolbarService.setLabel(user.username);
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

  private subscribeToUrlChanged(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroyed$),
        filter((event) => event instanceof NavigationEnd),
        map((event) => {
          return (event as NavigationEnd).url;
        }),
        map((url) => {
          return url.split('/').filter((i) => !!i);
        }),
        tap((url) => {
          this.withChat = url.length > 1;
        }),
        filter((parts) => parts.length > 1),
        switchMap(() => this.route.firstChild?.params!),
        distinctUntilChanged(),
        map((params) => params.username ?? '')
      )
      .subscribe((username) => {
        this.activeChatName = username;
        this.toolbarService.setLabel(username);
      });
  }

  private fetchCurrentUser(): void {
    this.usersService
      .getCurrentUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        this.currentUser = user;
      });
  }

  private fetchUsers(): void {
    this.usersService
      .getUsers({ withOutCurrent: true })
      .pipe(takeUntil(this.destroyed$))
      .subscribe((users) => {
        this.users = users;
      });
  }

  private subscribeToLocalPeerIdChanged(): void {
    this.peerService.localPeerId$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((peerId) => {
        if (!peerId) return;
        this.peerIdService.addCurrentUserPeerId(peerId).subscribe(() => {
          this.logUserPeerId(this.currentUser.username, peerId);
        });
      });
  }
}

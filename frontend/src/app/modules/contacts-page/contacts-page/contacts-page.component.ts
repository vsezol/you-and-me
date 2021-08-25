import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';


import { ServerUser } from '@common';
import { PeerIdService, PeerService } from '@modules/peer';
import { UsersService } from '@modules/users';
import { LoggerService } from '@modules/logger';
import { ToolbarService } from '@modules/toolbar';
import { SocketService } from '@modules/socket';

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
    private toolbarService: ToolbarService,
    private socketService: SocketService,
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
    this.setToolBarLabel(user.username);
    this.router.navigate(['/contacts', user.username]);
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
        this.setToolBarLabel(username);
        this.activeChatName = username;
      });
  }

  private setToolBarLabel(username: string): void {
    this.toolbarService.setLabel(`Chat with ${username}`);
  }

  private fetchCurrentUser(): void {
    this.usersService
      .getCurrentUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        this.currentUser = user;
        this.socketService.registerName(this.currentUser.username);
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

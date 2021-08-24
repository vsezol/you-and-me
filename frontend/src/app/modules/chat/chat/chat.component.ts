import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { ServerUser } from '@common';
import { PeerIdService, PeerService } from '@modules/peer';
import { UsersService } from '@modules/users';
import { LoggerService } from '@modules/logger';
import { DefaultToolbarAction, ToolbarService } from '@modules/toolbar';
import { ToolbarAction } from '@modules/toolbar';
import { SocketService } from '@modules/socket';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private currentUser!: ServerUser;
  private remoteUsername!: string;

  private destroyed$: Subject<void> = new Subject<void>();

  private actions: ToolbarAction[] = [
    new DefaultToolbarAction({
      icon: 'videocam',
      name: 'videoCall',
    }),
    new DefaultToolbarAction({
      icon: 'call',
      name: 'voiceCall',
    }),
  ];

  constructor(
    private toolbarService: ToolbarService,
    private peerIdService: PeerIdService,
    private peerService: PeerService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private socketService: SocketService
  ) {
    this.form = new FormGroup({
      message: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.toolbarService.setActions(this.actions);

    this.toolbarService
      .getActionsStream()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((action) => {
        action.disable();
        if (action.name === 'videoCall') {
          this.makeVideoCall();
        } else if (action.name === 'voiceCall') {
        }
      });

    this.usersService
      .getCurrentUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        this.currentUser = user;
      });

    this.route.params.pipe(takeUntil(this.destroyed$)).subscribe((params) => {
      this.remoteUsername = params.username;
    });
  }

  ngOnDestroy(): void {
    this.toolbarService.clearActions();
  }

  makeVideoCall(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.peerIdService
        .getPeerIdByUsername(this.remoteUsername)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(async (peerId) => {
          this.logger.info(`ChatComponent`)(
            `${this.remoteUsername} has id ${peerId}`
          );

          await this.peerService.call({
            peerId,
            metadata: {
              caller: { name: this.currentUser.username },
            },
          });
          resolve();
        });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.socketService.sendMessage({
        from: this.currentUser.username,
        to: this.remoteUsername,
        content: this.form.value.message,
      });
      this.form.reset();
    }
  }
}

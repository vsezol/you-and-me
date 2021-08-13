import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/core/services/toolbar.service';
import { PeerIdService } from '../../peer/peer-id.service';
import { PeerService } from '../../peer/peer.service';
import { UsersService } from '../../users/users.service';
import { ServerUser } from '../../../common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from '../../logger/logger.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(
    private toolbarService: ToolbarService,
    private peerIdService: PeerIdService,
    private peerService: PeerService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) {}

  private currentUser!: ServerUser;
  private remoteUserName!: string;

  private destroyed$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.toolbarService.setActions([
      {
        icon: 'videocam',
        name: 'videoCall',
      },
      {
        icon: 'call',
        name: 'voiceCall',
      },
    ]);

    this.toolbarService
      .getActionsStream()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((actionName) => {
        if (actionName === 'videoCall') {
          this.makeVideoCall();
        } else if (actionName === 'voiceCall') {
        }
      });

    this.usersService
      .getCurrentUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        this.currentUser = user;
      });

    this.route.params.pipe(takeUntil(this.destroyed$)).subscribe((params) => {
      this.remoteUserName = params.username;
    });
  }

  ngOnDestroy(): void {
    this.toolbarService.clearActions();
  }

  makeVideoCall() {
    this.peerIdService
      .getPeerIdByUsername(this.remoteUserName)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(async (peerId) => {
        this.logger.info(`ChatComponent`)(
          `${this.remoteUserName} has id ${peerId}`
        );

        await this.peerService.call({
          peerId,
          metadata: {
            caller: { name: this.currentUser.username },
          },
        });
      });
  }
}

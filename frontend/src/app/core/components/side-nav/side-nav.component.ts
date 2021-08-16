import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ServerUser } from '@common';
import { ThemeService } from '@core';
import { UsersService } from '@modules/users';
import { AuthService } from '@modules/auth';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
  @Input()
  public isOpened = false;

  @Output()
  public isOpenedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public currentUser!: ServerUser;

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private usersService: UsersService,
    public authService: AuthService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.usersService
        .getCurrentUser()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((user) => {
          this.currentUser = user;
        });
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

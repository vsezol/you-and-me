import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { UsersService } from 'src/app/modules/users/users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ServerUser } from 'src/app/common';
import { ThemeService } from '../../services/theme.service';

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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UsersService } from '../../users/users.service';
import { ServerUser, User } from '../../../common';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
})
export class ContactsPageComponent implements OnInit, OnDestroy {
  constructor(private usersService: UsersService) {}

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
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

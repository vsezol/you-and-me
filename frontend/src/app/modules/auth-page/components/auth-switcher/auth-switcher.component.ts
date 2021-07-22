import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthTypeNames } from '../../auth-page-routing.module';

@Component({
  selector: 'app-auth-switcher',
  templateUrl: './auth-switcher.component.html',
  styleUrls: ['./auth-switcher.component.scss'],
})
export class AuthSwitcherComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private route: ActivatedRoute) {}

  destroyed$: Subject<void> = new Subject<void>();

  isSignInForm = false;

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroyed$)).subscribe((params) => {
      this.isSignInForm = params.authType === AuthTypeNames.SIGN_IN;
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  handleSwitchAuthType(): void {
    this.router.navigate([
      'auth',
      this.isSignInForm ? AuthTypeNames.SIGN_UP : AuthTypeNames.SIGN_IN,
    ]);
  }
}

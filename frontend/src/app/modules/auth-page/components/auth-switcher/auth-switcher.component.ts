import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { AuthTypeNames } from '../../auth-page-routing.module';
import { AuthInfo } from '../../views/auth-page/auth-page.component';

@Component({
  selector: 'app-auth-switcher',
  templateUrl: './auth-switcher.component.html',
  styleUrls: ['./auth-switcher.component.scss'],
})
export class AuthSwitcherComponent {
  constructor(private router: Router) {}

  @Input() authInfo$!: BehaviorSubject<AuthInfo>;

  handleSwitchAuthType(): void {
    this.router.navigate([
      'auth',
      this.authInfo$.getValue().isSignIn
        ? AuthTypeNames.SIGN_UP
        : AuthTypeNames.SIGN_IN,
    ]);
  }
}

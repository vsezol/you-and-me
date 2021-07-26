import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuth) {
      return true;
    }

    this.router.navigate(['auth', 'sign-in'], {
      queryParams: {
        errorMessage: 'You are not authorized!',
      },
    });
    return false;
  }
}

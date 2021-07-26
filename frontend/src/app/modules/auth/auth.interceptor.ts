import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuth) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('[Interceptor Error]:', error);

        if (error.status === 401) {
          this.authService.signOut();

          this.router.navigate(['auth'], {
            queryParams: {
              errorMessage: 'You are not authorized!',
            },
          });
        }

        return throwError(error);
      })
    );
  }
}

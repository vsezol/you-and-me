import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import {
  SomethingWentWrongError,
  UnauthorizedError,
} from '../../common/errors';

export interface User {
  username: string;
  password: string;
}

interface ResponseWithJWTToken {
  access_token: string;
}

const extractToken = (response: ResponseWithJWTToken): string =>
  response.access_token;

@Injectable()
export class AuthService {
  private apiUrl = environment.apiUrl;

  private jwtToken = '';

  constructor(private http: HttpClient) {}

  signUp(user: User): Observable<string> {
    return this.fetchJWTToken('register', user).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('signUp', err);
        return throwError(new SomethingWentWrongError({ status: err.status }));
      })
    );
  }

  signIn(user: User): Observable<string> {
    return this.fetchJWTToken('login', user).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 401:
            return throwError(new UnauthorizedError());
          default:
            console.log('signIn', err);
            return throwError(
              new SomethingWentWrongError({ status: err.status })
            );
        }
      })
    );
  }

  private fetchJWTToken(url: string, user: User): Observable<string> {
    return this.http
      .post<ResponseWithJWTToken>(`${this.apiUrl}/auth/${url}`, user)
      .pipe(
        map(extractToken),
        tap(
          (token) => {
            this.setJWTToken(token);
          },
          () => {
            this.setJWTToken('');
          }
        )
      );
  }

  private setJWTToken(token: string) {
    this.jwtToken = token;
  }

  get isAuth(): boolean {
    return !!this.jwtToken;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from '@environments';

import {
  SomethingWentWrongError,
  UnauthorizedError,
  CreateUserProps,
} from '@common';

export interface AuthResponse {
  token: string;
  expiresIn: number;
}

interface AuthData {
  token: string;
  expirationDate: number;
}

const AUTH_STORAGE_KEY = 'auth-data';

@Injectable()
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  public isAuthenticated(): boolean {
    const { token, expirationDate } = this.getAuthData();

    return token.length > 0 && Date.now() < expirationDate;
  }

  public signOut(): Promise<void> {
    return new Promise((res) => {
      this.clearToken();
      this.router.navigate(['auth']);
      res();
    });
  }

  public signUp(user: CreateUserProps): Observable<AuthResponse> {
    return this.fetchJWTToken('register', user).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('signUp', err);
        return throwError(new SomethingWentWrongError({ status: err.status }));
      })
    );
  }

  public signIn(user: CreateUserProps): Observable<AuthResponse> {
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

  private fetchJWTToken(
    url: string,
    user: CreateUserProps
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/${url}`, user)
      .pipe(
        tap(
          (response) => {
            this.setToken(response.token, response.expiresIn);
          },
          () => {
            this.clearToken();
          }
        )
      );
  }

  public getToken(): string {
    return this.getAuthData().token;
  }

  private setToken(token: string, expiresIn: number): void {
    this.setAuthData(token, expiresIn);
  }

  private clearToken(): void {
    this.setAuthData();
  }

  private setAuthData(token = '', expiresIn = 0): void {
    const auth: AuthData = {
      token,
      expirationDate: this.calcExpirationDate(expiresIn),
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  }

  private getAuthData(): AuthData {
    const jsonData =
      localStorage.getItem(AUTH_STORAGE_KEY) ?? JSON.stringify({});

    const { token = '', expirationDate = 0 }: AuthData = JSON.parse(jsonData);

    return {
      token,
      expirationDate,
    };
  }

  private calcExpirationDate(expiresIn: number): number {
    return Date.now() + expiresIn * 1000;
  }
}

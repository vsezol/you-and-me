import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  register(user: User): Observable<string> {
    return this.fetchJWTToken('register', user);
  }

  login(user: User) {
    return this.fetchJWTToken('login', user);
  }

  private fetchJWTToken(url: string, user: User): Observable<string> {
    return this.http
      .post<ResponseWithJWTToken>(`${this.apiUrl}/auth/${url}`, user)
      .pipe(map(extractToken), tap(this.setJWTToken).bind(this));
  }

  private setJWTToken(token: string) {
    this.jwtToken = token;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments';

import { ServerUser } from '@common';

@Injectable()
export class UsersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getCurrentUser(): Observable<ServerUser> {
    const url = `${this.apiUrl}/users/current`;

    return this.http.get<ServerUser>(url);
  }

  public getUsers(
    { withOutCurrent } = { withOutCurrent: false }
  ): Observable<ServerUser[]> {
    const url = `${this.apiUrl}/users/all`;

    return this.http.get<ServerUser[]>(url, {
      params: {
        withOutCurrent,
      },
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments';

@Injectable()
export class PeerIdService {
  private apiUrl = `${environment.apiUrl}/peer`;

  constructor(private http: HttpClient) {}

  public getPeerIdByUsername(username: string): Observable<string> {
    const url = `${this.apiUrl}/id`;

    return this.http
      .get<{ peerId: string }>(url, {
        params: {
          username,
        },
      })
      .pipe(map(({ peerId }) => peerId));
  }

  public addCurrentUserPeerId(id: string): Observable<string> {
    const url = `${this.apiUrl}/add/${id}`;

    return this.http
      .get<{ message: string }>(url)
      .pipe(map(({ message }) => message));
  }
}

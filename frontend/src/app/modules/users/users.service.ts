import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ServerUser } from '../../common';

@Injectable()
export class UsersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCurrentUser() {
    const url = `${this.apiUrl}/users/current`;

    return this.http.get<ServerUser>(url);
  }
}

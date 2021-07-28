import { Injectable } from '@nestjs/common';

interface PeerIds {
  [key: string]: string;
}

@Injectable()
export class PeerService {
  private ids: PeerIds = {};

  addId(username: string, id: string): void {
    this.ids[username] = id;
  }

  findId(username: string): string {
    return this.ids[username];
  }
}

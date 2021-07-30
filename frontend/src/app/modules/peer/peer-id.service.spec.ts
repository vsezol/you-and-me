import { TestBed } from '@angular/core/testing';

import { PeerIdService } from './peer-id.service';

describe('PeerIdService', () => {
  let service: PeerIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeerIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

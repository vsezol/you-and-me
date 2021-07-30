import { TestBed } from '@angular/core/testing';

import { NewPeerService } from './new-peer.service';

describe('NewPeerService', () => {
  let service: NewPeerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPeerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

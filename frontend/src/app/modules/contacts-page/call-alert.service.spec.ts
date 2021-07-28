import { TestBed } from '@angular/core/testing';

import { CallAlertService } from './call-alert.service';

describe('CallAlertService', () => {
  let service: CallAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

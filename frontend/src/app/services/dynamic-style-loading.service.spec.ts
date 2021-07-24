import { TestBed } from '@angular/core/testing';

import { DynamicStyleLoadingService } from './dynamic-style-loading.service';

describe('DynamicStyleLoadingService', () => {
  let service: DynamicStyleLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicStyleLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RecentShortService } from './recent-short.service';

describe('RecentShortService', () => {
  let service: RecentShortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentShortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ShortDetailService } from './short-detail.service';

describe('ShortDetailService', () => {
  let service: ShortDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

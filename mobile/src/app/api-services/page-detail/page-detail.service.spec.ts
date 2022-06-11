import { TestBed } from '@angular/core/testing';

import { PageDetailService } from './page-detail.service';

describe('PageDetailService', () => {
  let service: PageDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SoldInService } from './sold-in.service';

describe('SoldInService', () => {
  let service: SoldInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoldInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

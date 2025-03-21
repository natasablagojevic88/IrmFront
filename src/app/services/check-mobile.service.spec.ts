import { TestBed } from '@angular/core/testing';

import { CheckMobileService } from './check-mobile.service';

describe('CheckMobileService', () => {
  let service: CheckMobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckMobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ReadCookieService } from './read-cookie.service';

describe('ReadCookieService', () => {
  let service: ReadCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

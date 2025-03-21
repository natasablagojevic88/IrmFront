import { TestBed } from '@angular/core/testing';

import { SendInfoService } from './send-info.service';

describe('SendInfoService', () => {
  let service: SendInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { YesNoService } from './yes-no.service';

describe('YesNoService', () => {
  let service: YesNoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YesNoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
